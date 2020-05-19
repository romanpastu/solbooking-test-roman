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

//db settings
const pgp = require("pg-promise")();
const db = pgp(constants.dbUrl)

app.get('/', function (req, res) {
  res.send('Hello World!');
});

//User auth related queries
app.post('/register', async (req,res) => {
  const { username, password, name} = req.body
  //hashes the password and inserts the user in the DB.
  const hashedPassword = await hash(password, 10);
  db.query("INSERT INTO users (username, password, name) VALUES ('"+username+"','"+hashedPassword+"','"+name+"')").then( data => {
    console.log(data)
    res.status(200).send("success")
  } 
  ).catch(err => {
    res.status(400).send(err)
  })
})


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});


