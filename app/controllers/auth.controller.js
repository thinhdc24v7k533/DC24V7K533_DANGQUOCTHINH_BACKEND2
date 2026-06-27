const jwt = require("jsonwebtoken");

const users = [
  {
    email: "admin@gmail.com",
    password: "Admin@123",
  },
];

exports.login = (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email);

  if (!user) {
    return res.status(404).send({ message: "User not found!" });
  }

  if (user.password !== password) {
    return res.status(401).send({ message: "Wrong password!" });
  }

  const token = jwt.sign({ email: user.email }, "SECRET_KEY", {
    expiresIn: "1h",
  });

  res.send({ token });
};
