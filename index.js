// http module
const fs = require("fs");
const http = require("http");
const { users, post, album } = require("./Api");
http
  .createServer((req, res) => {
    switch (req.url) {
      case "/profile":
        res.write(JSON.stringify(users));
      case "/post":
        res.write(JSON.stringify(post));
      case "/album":
        res.write(JSON.stringify(album));
      default:
        break;
    }
    res.end();
  })
  .listen(2500, () => {
    console.log("http://localhost:2500");
  });
