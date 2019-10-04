const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 1234;
const path = require('path');
const jwt = require('jsonwebtoken');

app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(bodyParser.json());


const fakeUser = {
    username: 'user',
    password: 'pw'
}

// to get a token upon login
app.post('/authenticate',(req,res) => {
    if (req.body.username === fakeUser.username && req.body.password === fakeUser.password) {
        const token = jwt.sign({username: req.body.username},'dog');
        res.json({token: token});
    } else {
        res.send({error: 'Wrong username or password'});
    }
})

// get token from header in req
const ensureToken = (req,res,next) => {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next()
    } else {
        res.status(403).end();
    }
}

// allow if token is verified
app.post('/calc', ensureToken, (req,res) => {
  var currCount = req.body.count;
  jwt.verify(req.token,'dog', (err,data) => {
      if (err) {
          res.status(403).send(err);
      } else {
          var increment = Math.max(1, currCount*2);
          res.status(200).send({nextCount: increment});
      }
  })
})

app.listen(port,() => console.log(`listening on port ${port}`))