var sequelize = require('sequelize');
var productoModelo = require('./models/producto');

//conexion con la BD
// LPmIn7ZP4BXzk2Wr


const conexion = new sequelize('productos','4Le7w83Snquz68J.root','LPmIn7ZP4BXzk2Wr',{
    host: 'gateway01.us-west-2.prod.aws.tidbcloud.com',
    port: 4000,
    dialect: 'mysql',
    dialectOptions: {
        ssl: {
            minVersion: 'TLSv1.2',
            rejectUnauthorized: true
        }
    }
});

const producto = productoModelo(conexion);

conexion.sync({force:false})
.then(() => {
    console.log('Conexion exitosa a la BD');
})
.catch(e => {
    console.error('Error en la conexión'+ " "+ e);
})

module.exports = {
    producto
}
