require('dotenv').config();
const express = require('express');
const pg = require('pg');

const app = express();
const PORT = process.env.PORT;



app.listen(PORT, ()=> console.log(`I am alive on ${PORT}`))


