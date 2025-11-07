const Car = require("../models/carModel");


// car test controller
exports.test = async (req, res) => {
    try {
        res.status(200).send("Car route test is working fine")
    } catch (error) {
        res.status(500).send(`Error in car test controller: ${error.message}`)
    }
}

// add car controller
exports.addCar = async (req, res) => {
    try {
        const newCar = new Car(req.body);
        await newCar.save()
        res.status(201).send({ success: [{msg: "Car added successfully!"}], car: newCar });
    } catch (error) {
        console.error(`Error in add car controller: ${error.message}`);
        res.status(500).send({ errors: [{ msg: 'Server error adding car' }] });
    }
}

// get all cars controller
exports.getAllCars = async (req, res) => {
    try {
        const foundCars = await Car.find().sort({ createdAt: -1 });
        if (foundCars.length === 0) {
            return res
              .status(404)
              .send({ errors: [{ msg: "Cars list is empty" }] });
        }
        res.status(200).send({ cars: foundCars, success: [{msg: "Car list fetshed successfully"}] });
    } catch (error) {
                console.error(`Error in getting all cars controller: ${error.message}`);
                res
                  .status(500)
                  .send({ errors: [{ msg: "Server error getting all cars" }] });
    }
}

// get car by id controller
exports.getCarById = async (req, res) => {
  try {
    const {id} = req.params;
    const foundCar = await Car.findById(id);
    if (!foundCar) {
      return res.status(404).send({ errors: [{ msg: "Car not found" }] });
    }
    res
      .status(200)
      .send({
        car: foundCar,
        success: [{ msg: "Car found successfully" }],
      });
  } catch (error) {
    console.error(`Error in getting car by id controller: ${error.message}`);
    res
      .status(500)
      .send({ errors: [{ msg: "Server error getting car by id" }] });
  }
};

// get car by make controller
exports.getCarsByMake = async (req, res) => {
  try {
    const {make} = req.query;
    const foundCars = await Car.find({make: {$regex: make, $options: 'i'}});
    if (foundCars.length === 0) {
      return res
        .status(404)
        .send({ errors: [{ msg: `There is no cars made by ${make}` }] });
    }
    res
      .status(200)
      .send({
        cars: foundCars,
        success: [{ msg: "Cars fetched successfully!" }],
      });
  } catch (error) {
    console.error(`Error in getting car by make controller: ${error.message}`);
    res
      .status(500)
      .send({ errors: [{ msg: "Server error getting car by make" }] });
  }
};

// get car by make controller
exports.updateCar = async (req, res) => {
  try {
    const {id} = req.params;
    const newData = req.body;
    const updatedCar = await Car.findByIdAndUpdate(id, newData, {new: true});
    if (!updatedCar) {
      return res
        .status(404)
        .send({ errors: [{ msg: "Cannot update this car" }] });
    }
    res.status(200).send({
      car: updatedCar,
      success: [{ msg: "Car updated successfully!" }],
    });
  } catch (error) {
    console.error(`Error in updating car controller: ${error.message}`);
    res
      .status(500)
      .send({ errors: [{ msg: "Server error updating car" }] });
  }
};

// delete car by id controller
exports.deleteCar = async (req, res) => {
  try {
    const {id} = req.params;
    const deletedCar = await Car.findByIdAndDelete(id);
    if (!deletedCar) {
      return res
        .status(404)
        .send({ errors: [{ msg: "Cannot delete this car" }] });
    }
    res.status(200).send({
      car: deletedCar,
      success: [{ msg: "Car deleted successfully!" }],
    });
  } catch (error) {
    console.error(`Error in deleting car controller: ${error.message}`);
    res
      .status(500)
      .send({ errors: [{ msg: "Server error deleting car" }] });
  }
};