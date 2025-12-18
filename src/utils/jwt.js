const jwt = require('jsonwebtoken');
const env = require('../config/env');


//signToken function
const signToken = (payload, options = {}) =>
  jwt.sign(payload, env.jwtSecret, { expiresIn: env.jwtExpiresIn, ...options });

const verifyToken = (token) =>
  jwt.verify(token, env.jwtSecret);

module.exports = { signToken, verifyToken };