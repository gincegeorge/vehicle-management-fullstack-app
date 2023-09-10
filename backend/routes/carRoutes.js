const express = require('express')
const { addCar, viewCars, editCar, deleteCar } = require('../controllers/carController')
const router = express.Router()


router.get('/', viewCars)
router.post('/add', addCar)
router.put('/edit/:id', editCar)
router.delete('/delete/:id', deleteCar)
module.exports = router 