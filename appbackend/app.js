const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}) );

let lstRecetas;
fs.readFile('recetario.json', 'utf8', function (err, data) {
  if (err) throw err;
  lstRecetas = data;
});

//home - recetas
app.route('/api/recetas').get((req, res) => {
    res.send(JSON.parse(lstRecetas));
});

app.route('/api/login').post((req, res) => {
    var data = req;
    console.log(req.body);
    console.log("llego node!");
    res.send("Ok");
});

app.listen(8080, function () {
    console.log('Server started!');
});