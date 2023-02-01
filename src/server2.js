//const express = require('express');
import express from 'express';
import configViewEngine from './configs/viewEngine';

const app = express();
const port = process.env.PORT || 3000;

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

