const env = {
  port: process.env.PORT || 9000,
  jwtSecret: process.env.JWT_SECRET || "d126653fe95fe0729c348a7d7b23cd35b208b1a2ae05acb0c6320cf560ed1781e1625436856d972f2c4ecff6c3c04223b493d34b576d30cc99a9533bd646aa9a",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
  bcryptSaltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS || "10", 10),
};

module.exports = env;
