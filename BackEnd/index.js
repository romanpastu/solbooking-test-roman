require('dotenv/config')

//express use settings
const express = require("express");
const app = express();
const cors = require('cors');

//express settings
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//jwt management and auth
const { hash, compare } = require('bcryptjs')
const { verify } = require('jsonwebtoken')
const { createAccessToken, createRefreshToken, sendAccessToken } = require('./token.js')
const { isAuth } = require('./isAuth.js')
const { refresh } = require('./refresh.js')
const { isAuthRefreshed } = require('./isAuthRefreshed.js')

//Database settings
const {db} = require('./database.js')

//Login protection middleware for api
function requireLogin(req, res, next) {

  try {

    const userId = isAuth(req)
    if (userId !== null) {
      next();
    }

  } catch (err) {
    if (err.message == "jwt expired") {

      async function result() {
        var data = await refresh(req)

        const userId = isAuthRefreshed(data.accesstoken)
        if (userId !== null) {
          next();
        }
      }
      result();
    }
    if (err.message != "jwt expired") {
      res.status(400).send({
        error: `${err.message}`
      })
    }

  }
}



//USER AUTH RELATED ROUTES
app.post('/register', async (req, res) => {
  const { username, name, password1, password2 } = req.body
 
  if (password1 != password2) {
    res.status(400).send(new Error('Passwords must be equal'));
  }
  if (password2 == '') {
    res.status(401).send(new Error('Theres no password'));
  }
  if (username == '') {
    res.status(402).send(new Error('You must specify an username'))
  }
  if (name == '') {
    res.status(403).send(new Error('You must specify a name'))
  }
  
  
  //hashes the password and inserts the user in the DB.
  const hashedPassword = await hash(password2, 10);
  db.query("INSERT INTO users (username, password, name) VALUES ('" + username + "','" + hashedPassword + "','" + name + "')").then(data => {
    console.log(data)
    res.status(200).send("success")
  }
  ).catch(err => {
    res.status(400).send(err)
  })
})

app.post('/login', async (req, res) => {
  const { nickname, password } = req.body;
  const username = nickname
  
  try {
    //selects the user from the db
    var user = "";
    db.query("SELECT * FROM users where username='" + username + "'").then(async function (data) {
      user = data;
      //check if the user exists in the db
      if (!user[0]) {
        res.status(400).send("User doesnt exist");
        throw new Error("User doesnt exist");
      }
      //check if the password is valid
      const valid = await compare(password, user[0].password);
      if (!valid) {
        res.status(401).send("Password not correct");
        throw new Error("Password not correct")
      }
      //creates the accessToken, and the refreshToken for the user
      const accessToken = createAccessToken(user[0].id, user[0].name)
      const refreshToken = createRefreshToken(user[0].id)
      //Sets the refreshtoken of the user, and send the accesstoken to the client
      db.query("UPDATE users SET refresh_token = '" + refreshToken + "' WHERE id = '" + user[0].id + "';").then(function (data) {
        sendAccessToken(res, accessToken);
      }).catch(function (error) {
        console.log("ERROR: ", error)
      })
    }).catch(function (error) {
      console.log("esto¿?")
      console.log("ERROR: ", error)
      res.send(error)
    })
  } catch (err) {
    
    res.send({
      error: `${err.message}`
    })
  }
})

//token verification route
app.post('/verify', async (req, res) => {
  try {
    const userId = isAuth(req)
    if (userId !== null) {
      res.send({
        status: "valid"
      })
    }
  } catch (err) {
    res.send({
      error: `${err.message}`
    })
  }
})

//token refreshing route
app.post('/refresh_token', (req, res) => {
  const authorization = req.headers['authorization']

  if (!authorization) throw new Error("You need to login");
  accesstoken = authorization.split(' ')[1];
  var userId = verify(accesstoken, process.env.ACCESS_TOKEN_SECRET, { ignoreExpiration: true })
  userId = userId.userId



  //once userId refresh token is known we verify it
  db.query("SELECT * FROM users where id='" + userId + "'").then(data => {
    var user = data;
    token = user[0].refresh_token;
    var id = user[0].id;
    if (!token) return res.send({ accesstoken: '' });

    let payload = null;

    try {
      payload = verify(token, process.env.REFRESH_TOKEN_SECRET);
    } catch (err) {
      return res.send({ accesstoken: '' });
    }

    user = ""

    db.query("SELECT * FROM users WHERE id='" + id + "'").then(function (data) {
      user = data;
      if (!user) return res.send({ accesstoken: '' });
      //if user exists check if refreshtoken exist on user

      if (user[0].refresh_token !== token) {
        return res.send({ accesstoken: '' })
      }

      //if token exist create a new Refresh and Accestoken
      const accesstoken = createAccessToken(user[0].id, user[0].name);
      const refreshtoken = createRefreshToken(user[0].id);

      db.query("UPDATE users SET refresh_token = '" + refreshtoken + "' WHERE id = '" + user[0].id + "';").then(function (data) {
        return res.send({ accesstoken });

      }).catch(function (error) {
        console.log("ERROR: ", error)
      })


    }).catch(function (error) {
      console.log("ERROR: ", error)
      res.send(error);
    })
  })
})

//HOTEL RELATED ROUTES
//get hotel list based on user id
app.get('/user/:id/hotel-list',requireLogin, async (req, res) => {
  const userId = req.params.id;
  db.query("SELECT hotels.* from users inner join users_hotels on users.id=users_hotels.id_user inner join hotels on hotels.id=users_hotels.id_hotel where users.id='" + userId + "'").then(data => {
    console.log(data)
    res.send(data)
  }).catch(err => {
    res.send(err)
    console.log(err)
  })
})

//register a new hotel
app.post('/hotel/register/:id', requireLogin,async (req, res) => {
  const userId = req.params.id;
  const { name, address, phone, mail } = req.body;
console.log(name,address,phone,mail)
  //checks if the mail is valid
  if ((mail.match(/@/g) || []).length != 1) {
    res.status(401).send("invalid mail")
    throw new Error("Invalid mail");
  };

  db.query("INSERT INTO hotels (name, address, phone, mail) VALUES ('" + name + "','" + address + "','" + phone + "','" + mail + "')").then(data => {
    db.query("SELECT id from hotels where name='"+name+"'").then(data =>{
      db.query("INSERT INTO users_hotels (id_user , id_hotel) VALUES ('"+userId+"','"+data[0].id+"')").then(data => {
        console.log(data)
        res.status(200).send("inserted")
      })
    })
  }).catch(err => {
    console.log(err)
    res.status(400).send(err)
  })
})

//Delete an hotel
app.delete('/hotel/:id/delete',requireLogin, async (req, res) => {
  const hotelId = req.params.id;
  console.log("time to delete")
  db.query("DELETE from hotels where id='" + hotelId + "';").then(data => {
    console.log(data)
    res.status(200).send("deleted")
  }).catch(err => {
    console.log(err)
    res.status(400).send(err)
  })
})

//Update hotel info
app.post('/hotel/:id/update', requireLogin, async (req, res) => {
  const { name, address, phone, mail } = req.body
  const hotelId = req.params.id;

  //checks if the mail is valid
  if ((mail.match(/@/g) || []).length != 1) {
    res.status(401).send("invalid mail")
    throw new Error("Invalid mail");
  };

  //updates the mail
  db.query("UPDATE hotels SET name= '" + name + "' , address = '" + address + "', phone = '" + phone + "', mail = '" + mail + "' where id = '" + hotelId + "'").then(data => {
    console.log(data);
    res.status(200).send("updated")
  }).catch(err => {
    console.log(err)
    res.status(400).send(err)
  })
})



app.listen(2000, function () {
  console.log('Express running on port 2000!');
});


