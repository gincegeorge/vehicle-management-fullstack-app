const carSchema = require('../models/carSchema')

//add a car
const addCar = async (req, res) => {
    try {
        if (!req.body.name ||
            !req.body.description ||
            !req.body.price ||
            !req.body.availabeQuantity ||
            !req.body.manufacture ||
            !req.body.model) {
            res.status(400).send({ message: "Send all required fields" })
        }

        const neCar = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            availabeQuantity: req.body.availabeQuantity,
            manufacture: req.body.manufacture,
            model: req.body.model
        }

        const car = await carSchema.create(neCar)

        res.status(201).send(car)

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error?.message })
    }
}

//view all cars
const viewCars = async (req, res) => {
    try {
        const cars = await carSchema.find({})
        res.status(201).send({
            count: cars.length,
            data: cars
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message })
    }
}

//edit car
const editCar = async (req, res) => {
    try {

        if (!req.body.name ||
            !req.body.description ||
            !req.body.price ||
            !req.body.availabeQuantity ||
            !req.body.manufacture ||
            !req.body.model) {
            res.status(400).send({ message: "Send all required fields" })
        }

        const newCar = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            availabeQuantity: req.body.availabeQuantity,
            manufacture: req.body.manufacture,
            model: req.body.model
        }

        const { id } = req.params

        const result = await carSchema.findByIdAndUpdate(id, newCar)

        let car = await carSchema.findOne({ _id: result._id })

        if (!result) {
            res.status(404).json({ message: "Car not found" })
        } else {
            res.status(200).json({ message: "Car updated successfuly", data: car })
        }

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message })
    }
}

//delete car
const deleteCar = async (req, res) => {
    try {
        const { id } = req.params
        const result = await carSchema.findByIdAndDelete(id)

        if (!result) {
            res.status(404).json({ message: "Car not found" })
        } else {
            res.status(200).json({ message: "Car deleted successfuly" })
        }

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message })
    }
}

module.exports = {
    addCar,
    viewCars,
    editCar,
    deleteCar
}