var commands = require("require-dir-all")(__dirname + "/commands");
var events = require("require-dir-all")(__dirname + "/events");

// Init DataBase
global.DB = require("./DB.js");

DB.Connect((e) => {
  if (!e) {
    console.log(`DB Connected.`);
  } else {
    console.log(`DB Connection error - ${e}`);
  }
});
