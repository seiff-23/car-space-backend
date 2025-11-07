// require express
const express = require('express')
const { test, addCar, getAllCars, getCarById, getCarsByMake, updateCar, deleteCar } = require('../controllers/carControllers')

// get router
const router = express.Router()

// test router controller
router.get('/test', test)

// add car router controller
router.post('/add_car', addCar)

// get all cars router controller
router.get('/get_all_cars', getAllCars)

// get car by id router controller
router.get('/get_car/:id', getCarById)

// get cars by make router controller
router.get('/get_cars_by_make', getCarsByMake)

// update car router controller
router.put('/update_car/:id', updateCar)

// delete car router controller
router.delete('/delete_car/:id', deleteCar)



// export router
module.exports = router