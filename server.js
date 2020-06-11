require('dotenv').config();
const express = require('express');
const pg = require('pg');

const app = express();
const PORT = process.env.PORT || 8080;
const DB = process.env.DATABASE_URL;

const client = new pg.Client(DB);
client.on('error', err => console.error(err));

client.connect()
.then(()=>{
  app.listen(PORT, ()=> console.log(`I am alive on ${PORT}`))
})


