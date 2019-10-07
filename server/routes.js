const fakeUser = require('./model.js').faker;
const auth = require('./auth.js');

const postAuth = (req, res) => {
  if (req.body.username === fakeUser.username && req.body.password === fakeUser.password) {
    const token = auth.token(req.body.username);
    res.status(200);
    res.json({token: token});
  } else {
    res.status(401).send({error: 'Wrong username or password'});
  }
}

const postCalc = (req, res) => {
  var currCount = req.body.count;
  auth.verifyToken(req.token, (err, data) => {
    if (err) {
      res.status(401).send(err);
    } else {
      var increment = Math.max(1, currCount*2);
      res.status(200).send({nextCount: increment});
    }
  })
}

module.exports = {
  postAuth,
  postCalc
}
