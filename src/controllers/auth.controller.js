const Joi = require('joi');  // Val - req - body - data
const { registerUser, loginUser } = require('../services/auth.service');
const ApiError = require('../utils/ApiError');


//Defines rules for user registration input.
const registerSchema = Joi.object({
  name: Joi.string().min(2).max(80).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(128).required(),
});


//Validates login credentials.
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(128).required(),
});


//Handles user registration requests.
const register = async (req, res, next) => {
  try {
    const { error, value } = registerSchema.validate(req.body);
    if (error) {
      throw new ApiError(400, error.details[0].message);
    }

    const result = await registerUser(value);
    res.status(201).json({ success: true, ...result });
  } catch (err) {
    next(err);
  }
};


//handle login request 
const login = async (req, res, next) => {
  try {
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      throw new ApiError(400, error.details[0].message);
    }

    const result = await loginUser(value);
    res.json({ success: true, ...result });
  } catch (err) {
    next(err);
  }
};


//Return logged-in user info
const me = async (req, res) => {
  res.json({ success: true, user: req.user.toJSON() });
};

module.exports = {
  register,
  login,
  me,
};