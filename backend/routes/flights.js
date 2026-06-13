const express = require('express');
const router = express.Router();

// Arreglo en memoria para guardar los vuelos sin usar base de datos
let vuelosArray = [];
let nextId = 1;

// POST - Crear un vuelo
router.post('/Guardar Vuelos', (req, res) => {
    const origin = req.body.origin || req.body.origen;
    const destination = req.body.destination || req.body.destino;
    const departure_date = req.body.departure_date || req.body.fechaida;
    const return_date = req.body.return_date || req.body.fecharegreso;
    const passengers = req.body.passengers || req.body.numpasajetos;

    // Agregamos al principio del arreglo para que los más nuevos salgan primero
    vuelosArray.unshift({
        id: nextId++,
        origen: origin,
        destino: destination,
        fechaida: departure_date, 
        fecharegreso: return_date,
        numpasajetos: passengers
    });

    res.status(201).json({ message: 'Se ha guardado con exito' });
});

// GET - Obtener todos los vuelos directo de memoria
router.get('/Reservas', (req, res) => {
    res.json(vuelosArray);
});

module.exports = router;
