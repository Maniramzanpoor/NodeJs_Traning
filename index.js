//* fs ==> file system == process with cpu == not good for cpu base project or file manager proejct
const fs = require("fs");

const url = "test/admin/page";

//? create directory
// fs.mkdir(url, { recursive: true }, (error) => {
//   console.log(error);
// });

//? write file
// fs.writeFile(
//   "fs-writeText.txt",
//   "HI Mani its your first write file",
//   "utf-8",
//   (err) => console.log(err)
// );

//? append  data to file
// fs.appendFile(
//   "fs-writeText.txt",
//   "\nits your second write file",
//   "utf-8",
//   (err) => console.log(err)
// );

//* sync : whait for result and after go to next line :blocking
//*  nosync : dont wait for resule :nonblocking

//? read directory data list
// const files = fs.readdirSync("./");
// for (const file of files) {
//   console.log(file);
// }

//? delete file
// fs.unlinkSync("./fs-writeText.txt", (err) => console.log(err));

//? search to file exist or no 
console.log(fs.existsSync("./uers.js"));