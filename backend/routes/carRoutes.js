const express = require('express')
const { addCar, viewCars, editCar, deleteCar, viewCar, editFeaturedImage } = require('../controllers/carController')
const router = express.Router()
const store = require('../middlewares/multer');

router.get('/', viewCars)
router.post('/add', addCar)
router.get('/view/:id', viewCar)
router.put('/edit/:id', editCar)
router.post('/edit/featuredImage/:id', store.any("carImages"), editFeaturedImage)
router.delete('/delete/:id', deleteCar)
module.exports = router 