//const express = require('express');
import express from 'express';
import configViewEngine from './configs/viewEngine';
require('dotenv').config();

console.log(process.env)

const app = express();
//const port = process.env.PORT || 3000;
const port = process.env.PORT;

configViewEngine(app);

app.get('/', (req, res) => {
  res.render('index.ejs')
})

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

