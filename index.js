const path = require('path');

console.log(__dirname); // name of the directory

console.log(path.basename(__dirname)); // name of the file

console.log(path.dirname(__filename)); // the end pramter in adress or the folder dir

console.log(path.extname(__filename)); // the format of file 

console.log(path.parse(path.dirname(__filename))); // parse the file address