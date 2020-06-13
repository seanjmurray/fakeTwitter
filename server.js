require('dotenv').config();
const express = require('express');
const pg = require('pg');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const app = express();
const PORT = process.env.PORT || 8080;
const DB = process.env.DATABASE_URL;

const client = new pg.Client(DB);
client.on('error', err => console.error(err));

app.route('/')
.get((req,res)=>{
  res.status(200).redirect('/login');
})

app.route('/login')
.get((req,res)=>{
  let pass = req.query.pass;
  let sql = 'SELECT * FROM users WHERE username LIKE ($1);';
  let safe = [req.query.username]
  
  client.query(sql,safe)
    .then(user =>{
      let hashPass = user.rows[0].pass;
      bcrypt.compare(pass,hashPass)
        .then(result =>{
          console.log('the password search was',result)
        })
    })
  
})

app.get('*', (req,res) => {
  res.status(200).redirect('/');
})

client.connect()
.then(()=>{
  app.listen(PORT, ()=> console.log(`I am alive on ${PORT}`))
})


