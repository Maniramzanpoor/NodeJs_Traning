// http module
const fs = require("fs");
const http = require("http");
http
  .createServer((req, response) => {
    if (req.url == "/") {
      const home = fs.readFileSync("./index.html");
      response.write(home);
    }
    if (req.url == "/products") {
      const products = fs.readFileSync("./product.html");
      response.write(products);
    }
    response.end();
  })
  .listen(2500, () => {
    console.log("http://localhost:2500");
  });
