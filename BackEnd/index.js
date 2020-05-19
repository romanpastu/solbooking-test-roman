require('dotenv/config')
let constants = require('./constants.js')

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
const { createAccessToken, createRefreshToken, sendAccessToken } = require('./token.js')
//db settings
const pgp = require("pg-promise")();
const db = pgp(constants.dbUrl)

app.get('/', function (req, res) {
  res.send('Hello World!');
});

//User auth related queries
app.post('/register', async (req, res) => {
  const { username, password, name } = req.body
  //hashes the password and inserts the user in the DB.
  const hashedPassword = await hash(password, 10);
  db.query("INSERT INTO users (username, password, name) VALUES ('" + username + "','" + hashedPassword + "','" + name + "')").then(data => {
    console.log(data)
    res.status(200).send("success")
  }
  ).catch(err => {
    res.status(400).send(err)
  })
})

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

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
      const accessToken = createAccessToken(user[0].id)
      const refreshToken = createRefreshToken(user[0].id)
      //Sets the refreshtoken of the user, and send the accesstoken to the client
      db.query("UPDATE users SET refresh_token = '" + refreshToken + "' WHERE id = '" + user[0].id + "';").then(function (data) {
        sendAccessToken(res, accessToken);
      }).catch(function (error) {
        console.log("ERROR: ", error)
      })
    }).catch(function (error) {
      console.log("ERROR: ", error)
      res.send(error)
    })
  } catch (err) {
    res.send({
      error: `${err.message}`
    })
  }
})


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});


