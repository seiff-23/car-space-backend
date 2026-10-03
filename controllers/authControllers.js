const User = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");


// auth test controller
exports.test = async (req, res) => {
    try {
        res.status(200).send("Auth route test is working fine")
    } catch (error) {
        res.status(500).send(`Error in auth test controller: ${error.message}`)
    }
}

// register controller
exports.register = async (req, res) => {
    try {
      const { firstName, lastName, phone, email, password } = req.body;

      const existingEmail = await User.findOne({ email });

      if (existingEmail) {
        return res
          .status(400)
          .send({ errors: [{ msg: "Email already exists" }] });
      }

      // Administrator rights and metadata cannot be supplied at registration.
      const newUser = new User({ firstName, lastName, phone, email, password });

      const salt = 10;

      const hashedPassword = await bcrypt.hash(password, salt);

      newUser.password = hashedPassword;

      await newUser.save();

      // Generate JWT token
      const token = jwt.sign(
        {
          id: newUser._id,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
        },
        process.env.SECRET_KEY,
        { expiresIn: "7d" }
      );

      res
        .status(201)
        .send({
          success: [{ msg: "User registered successfully" }],
          user: newUser,
          token: token
        });
    } catch (error) {
        res.status(500).send({errors: [{msg: `Error in register controller: ${error.message}`}]})
    }
}


// login controller
exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;

      // Check if user exists
      const foundUser = await User.findOne({ email });

      if (!foundUser) {
        return res
          .status(400)
          .send({ errors: [{ msg: "User not found with this email" }] });
      }


      // Check password
      const hashedPassword = await bcrypt.compare(password, foundUser.password);

      if (!hashedPassword) {
        return res
          .status(400)
          .send({ errors: [{ msg: "Password incorrect" }] });
      }

      const token = jwt.sign(
        {
          id: foundUser._id,
          firstName: foundUser.firstName,
          lastName: foundUser.lastName,
          email: foundUser.email,
        },
        process.env.SECRET_KEY,
        { expiresIn: "7d" }
      );

        res
          .status(200)
          .send({
            success: [{ msg: `Hello ${foundUser.firstName} Welcome Back !` }],
            user: foundUser,
            token: token,
          });
    } catch (error) {
      res.status(500).send({ errors: [{ msg: "Unable to log in. Please try again." }] });
    }
}
