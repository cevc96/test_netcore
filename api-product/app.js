var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var cors = require('cors')
var app = express()
 
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

/*CONNECTIONS & ENDPOINTS */
const { poolPromise, sql } = require('./db/connection')
app.post('/Create', async (req, res) => {
  try {
    console.log(req.body);
    const pool = await poolPromise
    const insert = await pool.request()
        .input('nombre'       , sql.VarChar , req.body.nombre)
        .input('precio'       , sql.Decimal , req.body.precio)
        .input('stock'        , sql.Int     , req.body.stock)
        .input('fecharegistro', sql.DateTime, req.body.fecharegistro)
        .query('INSERT INTO Producto (nombre, precio, stock, fecharegistro) VALUES (@nombre, @precio, @stock, @fecharegistro)')      

    const result = await pool.request()
        .query('SELECT * FROM Producto')      
    res.status(201).send(result.recordset);
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})

app.get('/GetAll', async (req, res) => {
  try {
    console.log('entra');
    const pool = await poolPromise
    const result = await pool.request()
        .query('SELECT * FROM Producto')      
    res.status(201).send(result.recordset);
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})


app.delete('/:id', async (req, res) => {
  try {
    const pool = await poolPromise
    const result = await pool.request()
        .input('id', sql.Int , req.params.id)
        .query('DELETE FROM Producto WHERE id = @id');
    res.status(201).send(result);
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})

app.post('/Update/:id', async (req, res) => {
  try {
    const pool = await poolPromise
    const update = await pool.request()
        .input('nombre', sql.VarChar , req.body.nombre)
        .input('precio', sql.Decimal , req.body.precio)
        .input('stock' , sql.Int , req.body.stock)
        .input('id'    , sql.Int , req.params.id)
        .query('UPDATE Producto SET nombre = @nombre, precio = @precio, stock = @stock WHERE id = @id');

    const result = await pool.request()
        .query('SELECT * FROM Producto')   
    res.status(201).send(result.recordset);
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})

module.exports = app;
