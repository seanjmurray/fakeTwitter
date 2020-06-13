require('dotenv').config();
const express = require('express');
const bodyParser = require("body-parser");
const ejs = require("ejs");
const pg = require('pg');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const app = express();
const PORT = process.env.PORT || 8080;
const DB = process.env.DATABASE_URL;

const client = new pg.Client(DB);
client.on('error', err => console.error(err));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));

app.route('/')
.get((req,res)=>{
  res.status(200).redirect('/login');
})
app.route('/feed')
.get((req,res)=>{
  res.status(200).render('home');
})

app.route('/login')
.get((req,res)=>{
  res.status(200).render('login')
})
.post((req,res)=>{
  let pass = req.body.password;
  let sql = 'SELECT * FROM users WHERE username LIKE ($1);';
  let safe = [req.body.username]
  
  client.query(sql,safe)
    .then(user =>{
      if(user.rowCount){
      let hashPass = user.rows[0].pass;
      bcrypt.compare(pass,hashPass)
        .then(result =>{
          if(result){
            res.status(200).redirect('/feed');
          }else{
            res.status(200).render('login');
          }
        })
      }else{
        res.status(200).redirect('/register');
      }
    })
})

app.route('/register')
.get((req,res)=>{
  res.status(200).render('register')
})
.post((req,res)=>{
let email = req.body.email;
let username = req.body.username;
bcrypt.hash(req.body.password,saltRounds)
.then(hash =>{
let sql = 'SELECT * FROM users WHERE username LIKE ($1);';
let safe = [username];
client.query(sql,safe)
  .then(user =>{
    if(!user.rowCount){
      let sql = 'INSERT INTO users (username,email,pass) VALUES ($1,$2,$3);';
      let safe = [username,email,hash];
      client.query(sql,safe)
        .then(user =>{
          res.status(200).redirect('/feed');
        }).catch(err => console.log(err))
    }else{
      res.status(200).redirect('/login')
    }
  }).catch(err => console.log(err))
})
})

app.get('*', (req,res) => {
  res.status(200).redirect('/');
})

client.connect()
.then(()=>{
  app.listen(PORT, ()=> console.log(`I am alive on ${PORT}`))
})


