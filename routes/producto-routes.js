var router = require('express').Router();
var {producto} = require('../conexion')

// ruta home

router.get('/', (req,res) => {
    res.render('pages/index')
})

// ruta para la pagina insertar

router.get('/insertarProducto', (req, res) => {
    res.render('pages/insertarProducto')
})

// ruta o peticion para insertar un registro (producto nuevo)

router.post('/guardarProducto', (req, res) => {
    producto.create(req.body)
        .then(() =>{
            console.log('Se insertó el producto')
            res.redirect('/listarProductos')
        })
        .catch((e) => {
            console.log("Error al insertar:" + " "+e)
        })
})

//ruta o peticion para obtener todos los productos

router.get('/listarProductos', (req, res) => {
    producto.findAll()
        .then((data) => {
            res.render('pages/listarProductos', { productos: data })
        })
        .catch((e) => {
            console.log("Error en la consulta:" + " "+e)
        })
})

//ruta o peticion para obtener un producto por su ID

router.get('/buscarProducto/:idProducto', (req, res) => {
    producto.findAll({
        where: {
            idProducto: req.params.idProducto
        }
    })
        .then((data) => {
            res.render('pages/modificarProducto', { productos: data })
        })
        .catch((e) => {
            console.log("Error en la consulta:" + " "+e)
        })
})

//ruta o peticion para modificar un producto existente
router.post('/modificarProducto', (req, res) => {
    var idProducto = req.body.idProducto
    const productoModificado  = {
        nombreProducto: req.body.nombreProducto,
        marcaProducto: req.body.marcaProducto,
        precioProducto: req.body.precioProducto,
    }
    producto.update(productoModificado, {
        where: {
            idProducto: idProducto
        }
    })
        .then(()=> {
            console.log('Se modifico correctamente el producto')
            res.redirect('/listarProductos')
        })
        .catch((e) => {
            console.log("Error en la consulta:" + " "+e)

        })
})

//ruta para eliminar un producto

router.get('/eliminarProducto/:idProducto', (req, res) => {
    producto.destroy({
        where: {
            idProducto: req.params.idProducto
        }
    })
        .then(()=> {
            console.log('Se eliminó el producto')
            res.redirect('/listarProductos')
        })
        .catch((e) => {
            console.log("Error en la consulta:" + " "+e)

        })
})

module.exports = router;
