const jwt = require('jsonwebtoken');

// get token from header in request
const ensureToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.status(403).end();
  }
}

// generate a token
const token = (username) => {
  return jwt.sign({username: username}, 'dog');
}

// verify token from header
const verifyToken = (token, cb) => {
  jwt.verify(token, 'dog', (err, data) => {
    if(err) {
      cb(err);
    } else {
      cb(null, data);
    }
  })
}

module.exports = {
  ensureToken,
  token,
  verifyToken
}