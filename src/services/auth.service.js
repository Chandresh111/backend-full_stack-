const bcrypt = require('bcryptjs');
const User = require('../models/User');
const ApiError = require('../utils/ApiError');
const { signToken } = require('../utils/jwt');
const env = require('../config/env');


//Generate token and return user
const buildAuthResponse = (user) => {
  const token = signToken({ sub: user._id.toString(), role: user.role });
  return {
    token,
    user: user.toJSON(),
  };
};


//Check for existing user
const registerUser = async ({ name, email, password }) => {
  const existing = await User.findOne({ email });
  if (existing) {
    throw new ApiError(400, 'Email is already registered');
  }

  const salt = await bcrypt.genSalt(env.bcryptSaltRounds);
  const passwordHash = await bcrypt.hash(password, salt);


  //Create new user
  const user = await User.create({
    name,
    email,
    passwordHash,
  });

  return buildAuthResponse(user);  // Returns JWT and sanitized user info for immediate login.
};


//Find user by email
const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(401, 'Invalid email or password');
  }

  //compare password 
  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    throw new ApiError(401, 'Invalid email or password');
  }

  return buildAuthResponse(user);     //Returns JWT and user info after successful login.
};

module.exports = {
  registerUser,
  loginUser,
};