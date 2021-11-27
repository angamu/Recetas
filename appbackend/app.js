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
let lstUsuarios;
const dbRecetas = 'recetario.json';
const dbUsuarios = 'dbusuarios.json';

//cargar listado de recetas del json
fs.exists(dbRecetas, function(exists){
    if(exists){
        fs.readFile(dbRecetas, 'utf8', function (err, data) {
            if (err) throw err;
            lstRecetas = data;
        });
    }
});
//cargar listado de usuarios del json
fs.exists(dbUsuarios, function(exists){
    if(exists){
        fs.readFile(dbUsuarios, 'utf8', function (err, data) {
            if (err) throw err;
            lstUsuarios = data;
        });
    }
});

//home - recetas
app.route('/api/recetas').get((req, res) => {
    res.send(JSON.parse(lstRecetas));
});
//validar inicio de sesion
app.route('/api/login').post((req, res) => {
    let data = req;
    let arrUsuarios = JSON.parse(lstUsuarios);
    let existeUser =  Object.values(arrUsuarios).filter((user => user.email === req.body.user) && (user => user.contrasena === req.body.pass));
    if (existeUser.length > 0){
        res.send("valido");
    } else {
        res.send("erroruser");
    }
});
//registro de usuarios
app.route('/api/registro').post((req, res) => {
    let data = req;
    let arrUsuarios = JSON.parse(lstUsuarios);
    let existeUser =  Object.values(arrUsuarios).filter(user => user.email === req.body.user);
    if (existeUser.length == 0){
        arrUsuarios.push({"nombre":req.body.datau,"email":req.body.user,"contrasena":req.body.pass});
        var filejson = JSON.stringify(arrUsuarios); 
        fs.writeFile(dbUsuarios, filejson, function(err, result) {
            if(err) console.log('error', err);
        });
        res.send("registrado");
    } else {
        res.send("existe");
    }
});
//registro de recetas
app.route('/api/nuevareceta').post((req, res) => {
    let data = req;
    let arrRecetas = JSON.parse(lstRecetas);
    arrRecetas.push({"titulo":req.body.nombre,"descripcion":req.body.descripcion,"imagen":req.body.imagen,"preparacion":req.body.preparacion,"ingredientes":req.body.ingredientes,"notas":req.body.notas});
    var filejson = JSON.stringify(arrRecetas); 
    fs.writeFile(dbRecetas, filejson, function(err, result) {
        if(err) console.log('error', err);
    });
    res.send("registrada");
});
app.route('/api/misrecetas').get((req, res) => {
    res.send(JSON.parse(lstRecetas));
});

app.listen(8080, function () {
    console.log('Server started!');
});