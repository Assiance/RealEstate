const jwt = require('jsonwebtoken');

const secretKey = "this-is-a-secret";

validateToken = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    res.status(401).send();
  }

  token = token.replace("Bearer ", "");

  //verfies token and looks for secret key if doesnt exist sends error
  jwt.verify(token, secretKey, function (err, decoded) {
    if (err) {
      res.status(401).send();
      return;
    }

    next();
  });
}

//uses info to create a token the expires in an hour the returns token
function createToken(user) {
  const token = jwt.sign({
    id: user.id,
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email
  }, secretKey, { expiresIn: '1h' });

  return token;
}

module.exports = {
  validateToken,
  createToken
};