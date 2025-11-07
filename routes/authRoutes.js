// require express
const express = require("express");
const { test, register, login } = require("../controllers/authControllers");
const isAuth = require("../middlewares/isAuth");
const { registerValidation, validator } = require("../middlewares/validator");

// get router
const router = express.Router();

// test router controller
router.get('/test', test)

// register router controller
router.post("/register", registerValidation(), validator, register);

// login router controller
router.post('/login', login)

// current user router controller
router.get("/current", isAuth, (req, res) => {
  res.status(200).send({
    user: req.user,
    message: "Current user fetched successfully",
  });
});


// export router
module.exports = router;
