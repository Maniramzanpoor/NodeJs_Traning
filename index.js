// http module
const fs = require("fs");
const path = require("path");
const formidable = require("formidable");
const http = require("http");
const { users, post, album } = require("./Api.js");
const { uploadfile } = require("./modules/upload_file");
http
  .createServer((req, res) => {
    switch (req.url) {
      case "/profile":
        res.write(JSON.stringify(users));
        break;

      case "/post":
        res.write(JSON.stringify(post));
        break;

      case "/album":
        res.write(JSON.stringify(album));
        break;

      case "/fileUploads":
        const result = uploadfile(req, res);
        res.write(result)
        break;

      default:
        res.write(
          JSON.stringify({
            status: 404,
            message: "Route not found",
          })
        );
        break;
    }
    res.end();
  })
  .listen(3500, () => {
    console.log("http://localhost:2500");
  });
