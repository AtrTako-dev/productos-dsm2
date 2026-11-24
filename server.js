var express = require('express');
var productosRutas = require('./routes/producto-routes');

var app = express();

//Motor de vistas

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.use('/', productosRutas);

var port = process.env.PORT || 3001;
app.listen(port, ()=> {
    console.log('Servidor corriendo en el puerto: ' + port);
})
