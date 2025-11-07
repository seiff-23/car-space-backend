const { check, validationResult } = require("express-validator");

exports.registerValidation = () => [
  check("firstName", "The firstName cannot be empty.").notEmpty().escape().trim(),
  check("lastName", "The lastName cannot be empty.").notEmpty().escape().trim(),
  check("email", "This field cannot be empty.").notEmpty().escape(),
  check("email", "Incorrect type.").isEmail().escape(),
  check("password", "This field should be at least 6 carac.").isLength({
    min: 6,
    max: 15,
  }),
];

exports.validator = (req, res, next) => {
  const errors = validationResult(req);
  errors.isEmpty() ? next() : res.status(400).send(errors.array());
};
