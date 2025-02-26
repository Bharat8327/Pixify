// check the token are exist or not
const jwt = require('jsonwebtoken');
const { error } = require('../utils/responseWrapper');
const User = require('../models/User');
// here are problems comes bcz we are write this type path we write ("../env")

module.exports = async (req, res, next) => {
  if (
    !req.headers ||
    !req.headers.authorization ||
    !req.headers.authorization.startsWith('Bearer ')
  ) {
    return res.send(error(401, 'Authorization token are required'));
  }
  const token = req.headers.authorization.split(' ')[1];
  try {
    const verify = jwt.verify(token, process.env.ACCESS_TOKEN_PRIVATE_KEY);
    req._id = verify._id;

    const user = await User.findById(req._id);
    if (!user) {
      return res.send(error(404, 'user not found create a account'));
    }

    next();
  } catch (e) {
    return res.send(error(401, 'invalid access key'));
  }
};
