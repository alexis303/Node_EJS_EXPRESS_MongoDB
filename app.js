


// const http = require('http');
// const server = http.createServer((req, res) => {
//     res.end('estoy respondiendo a tu solicitud V.3');
// })


// const puerto = 3000;

// server.listen(puerto, ( ) => {
//     console.log('escuchando solicitudes')
// })



const express = require('express');
const bodyParser =  require('body-parser');
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

require('dotenv').config();

const port = process.env.PORT || 3000;

// conexion a la base de datos
const mongoose = require('mongoose');


const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.qdyjc.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;

mongoose.connect(uri, 
    {useNewUrlParser: true, useUnifiedTopology: true}
).then(
    () => console.log('Base de datos conectada')
).catch(
    e => console.log(e)
);


// motor de plantillas 
app.set("view engine", "ejs");
app.set("views", __dirname + "/view");


app.use(express.static(__dirname + "/public"));


app.use('/', require('./router/RutasWeb'));
app.use('/mascotas', require('./router/Mascotas'));

app.use((req, res, next) => {
    res.status(404).render("404",{
        titulo: "404",
        descripcion: "Titulo del sitio web"
    });
});


app.listen(port, ()=> {
    console.log("servidor a su servicio en el puerto", port);
}) 
