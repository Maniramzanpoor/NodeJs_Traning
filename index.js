const http = require("http");
const url = require("url");
var { MongoClient, ObjectId } = require("mongodb");
const DB_Url = "mongodb://localhost:27017/"; //* database url

let mongoclient, db; //? made a varible for db and mongoclient

mongoclient = new MongoClient(DB_Url); // create a new obj from mongo
mongoclient.connect((error, client) => {
  db = client.db("NodeJs"); // set the db name
  if (error) {
    console.log(err);
  }
});
http
  .createServer((req, res) => {
    const { url: path } = req;
    let method = req.method.toLowerCase();
    const query = url.parse(path, true).query;
    switch (url) {
      //!? insert user or create user :
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
      //!? select the list :
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
      //!? delete the data :
      default: {
        if ((method = "delete" && path.includes("/users?id="))) {
          const { id } = query; //* get the id from URL
          if (ObjectId.isValid(id)) {
            // check the id is ObjectID
            db.collection("users").deleteOne(
              { _id: ObjectId(id) },
              (error, result) => {
                if (!error) {
                  return res.end(JSON.stringify(result));
                }
                return res.end("error in delete users");
              }
            );
          } else {
            res.end("ObjectId is notValid");
          }
        }
        break;
      }
    }
  })
  .listen(2500, () => console.log("server is started"));
