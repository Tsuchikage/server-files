// Init events.
require("./events.js");

// Init commands.
require("./commands.js");

// Init DataBase
global.DB = require("./DB.js");

DB.Connect((e) => {
  if (!e) {
    console.log(`DB Connected.`);
  } else {
    console.log(`DB Connection error - ${e}`);
  }
});
