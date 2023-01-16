const http = require("http");
const url = require("url");
var { MongoClient, ObjectId } = require("mongodb");
const DB_Url = "mongodb://localhost:27017/"; //* database url
let mongoclient, db;
mongoclient = new MongoClient(DB_Url);
mongoclient.connect((error, client) => {
  db = client.db("NodeJs");
  if (error) {
    console.log(err);
  }
});
http
  .createServer((req, res) => {
    const { url: path } = req;
    let method = req.method.toLowerCase();
    const query = url.parse(path, true).query;
    switch (path) {
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
        if (
          ["path", "put", "post"].includes(method) &&
          path.includes("/users?id=")
        ) {
          const { id } = query;
          if (ObjectId.isValid(id)) {
            let data = [];
            req.on("data", (chunk) => {
              data.push(chunk.toString());
            });
            req.on("end", () => {
              const result = JSON.parse(data);
              db.collection("users").updateOne(
                { _id: ObjectId(id) },
                { $set: { ...result } },
                (error, result) => {
                  if (!error) {
                    res.end(JSON.stringify(result));
                  }
                  return res.end("Error in update user");
                }
              );
            });
          } else {
            return res.end("ObjectID is notValid");
          }
          break;
        } else if ((method = "delete" && path.includes("/users?id="))) {
          const { id } = query;
          if (ObjectId.isValid(id)) {
            db.collection("users").deleteOne(
              { _id: ObjectId(id) },
              (error, result) => {
                if (!error) res.end(JSON.stringify(result));
                res.end(method);
                return res.end("Error in delete users");
              }
            );
          } else {
            res.end("ObjectId is notValid");
          }
          break;
        }
        break;
      }
    }
  })
  .listen(2500, () => console.log("server is started"));
