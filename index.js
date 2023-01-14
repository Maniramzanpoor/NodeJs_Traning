const http = require("http");
var { MongoClient } = require("mongodb"); // import the mongoclient
const DB_Url = "mongodb://localhost:27017/"; // database url
let mongoclient, db; // made a varible for db and mongoclient
mongoclient = new MongoClient(DB_Url); // create a new obj from mongo
mongoclient.connect((error, client) => {
  db = client.db("NodeJs"); // set the db name
  if (error) {
    console.log(err);
  }
});

http
  .createServer((req, res) => {
    const { url } = req;
    let method = req.method.toLowerCase();
    switch (url) {
      // insert user or create user
      case "/users/insert": {
        if (method == "post") {
          let data = [];
          req.on("data", (chunk) => {
            data.push(chunk.toString());
          });
          req.on("end", () => {
            const { name, Lastname, address, email } = JSON.parse(data);
            db.collection("users").insert(
              { name, Lastname, address, email },
              (error, result) => {
                if (result.acknowledged) {
                  return res.end(
                    JSON.stringify({
                      name,
                      Lastname,
                      address,
                      email,
                    })
                  );
                }
              }
            );
          });
        }
        break;
      }
      // select the list
      case "/users/list": {
        if (method == "get") {
          db.collection("users")
            .find({})
            .toArray((error, result) => {
              if (!error) return res.end(JSON.stringify(result));
              return "have a some error";
            });
        }
        break;
      }
      default: {
        res.end("the page not loaded");
        break;
      }
    }
  })
  .listen(2500, () => console.log("server is started"));
