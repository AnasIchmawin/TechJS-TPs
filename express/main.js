const express = require('express');
const books = require('./books');
const app = express();
const port = 3000;

app.use(express.json());

app.use('/books', 
    (req, res, next) => {
    // middleware d'authentification 
    const auth = { login: "admin", password: "admin" };
    const b64auth = (req.headers.authorization || "").split(" ")[1] || "";
    const [loginDecoded, passwordDecoded] = Buffer.from(b64auth, "base64")
      .toString()
      .split(":");
    if (loginDecoded === auth.login && passwordDecoded === auth.password) {
      return next();
    }
    res.send("Unauthorized");
    return res.status(401).end();
  },
    books
);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});