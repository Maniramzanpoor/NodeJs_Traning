//? import commonJS use require
// const { add, mines } = require("./Module");
//? import Module use import
import { add, mines } from "./Module.js"; //! importnat to file foramt (.js)

console.log(add(5, 6));
console.log(mines(5, 2));
