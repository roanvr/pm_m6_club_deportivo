import express from 'express';
import path from 'path';
import fs from 'fs';
const routes = express.Router()
const __dirname = import.meta.dirname;

routes.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'))
});

routes.get('/deportes', (req, res) => {
    res.sendFile(path.join(__dirname, '../assets/data/data.json'));
});

routes.get('/agregar', (req, res) => {
    const {nombre, precio} = req.query
    const dataJson = fs.readFileSync('./assets/data/data.json')//Lee primero la data del json para luego agregarla al contenido del form
    const {deportes} = JSON.parse(dataJson)//Transforma el json tipo objeto a tipo string
    deportes.push({nombre, precio});
    fs.writeFileSync('./assets/data/data.json', JSON.stringify({deportes}));
    res.send('Datos agregados exitosamente')
});

routes.get('/editar', (req, res) => {
    const {nombre, precio, nombreNuevo, precioNuevo} = req.query;
    const dataJson = fs.readFileSync('./assets/data/data.json')
    let {deportes} = JSON.parse(dataJson)
    const editarDeporte = deportes.find(item => item.nombre === nombre);
    if (nombreNuevo) {
        editarDeporte.nombre = nombreNuevo;
    };
    if (precioNuevo) {
        editarDeporte.precio = nuevoPrecio;
    }
    fs.writeFileSync('./assets/data/data.json', JSON.stringify({deportes}));
    res.send('Deporte editado exitosamente')
});

routes.get('/eliminar', (req, res) => {
    const {nombre} = req.query;
    const dataJson = fs.readFileSync('./assets/data/data.json')
    let {deportes} = JSON.parse(dataJson)
    deportes = deportes.filter(item => item.nombre == nombre)
    fs.writeFileSync('./assets/data/data.json', JSON.stringify({deportes}));
    res.send('Elemento eliminado')
});

export default routes