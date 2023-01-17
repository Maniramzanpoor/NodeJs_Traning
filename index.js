const axios = require("axios").default;
// axios
//   .get("https://jsonplaceholder.typicode.com/users")
//   .then((res) => console.log(res.data))
//   .catch((error) => console.log(error));

axios
  .post("https://jsonplaceholder.typicode.com/posts", {
    userId: 10,
    title: "this is mani teset",
    body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
  })
  .then((res) => console.log(res.data))
  .catch((error) => console.log(error));
