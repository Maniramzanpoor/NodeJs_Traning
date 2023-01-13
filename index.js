// http module
const fs = require("fs");
const path = require("path");
const formidable = require("formidable");
const http = require("http");
const { users, post, album } = require("./Api.js");

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
        if (req.method.toLowerCase() === "post") {
          const form = new formidable.IncomingForm();
          form.parse(req, function (err, fields, files) {
            const oldFilePath = files.image.filepath;
            const newFilePath = path.join(
              __dirname,
              "uploads",
              Date.now() + ".jpg"
            );
            fs.renameSync(oldFilePath, newFilePath);
            res.write("file uploaded.");
          });
        } else {
          const htmlForm = fs.readFileSync("./fileUpload.html", "utf-8");
          res.write(htmlForm);
        }
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
  .listen(2500, () => {
    console.log("http://localhost:2500");
  });
