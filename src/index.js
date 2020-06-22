const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();

const { mongoose } = require('./database');


//Settings---

//Determina el puerto que le asigna el S.O o uno por defecto.
app.set('port', process.env.PORT || 3000);

//Middlewares---
app.use(morgan('dev'));
app.use(express.json());

//Routes---
app.use('/api/task', require('./routes/task.routes'));

//Static files---
app.use(express.static(path.join(__dirname, 'public')));

//Starting server.---
app.get('/', (req, res) => res.send('App working.'));
app.listen(app.get('port'), () => console.log(`Example app listening on port port! ${app.get('port')}`));