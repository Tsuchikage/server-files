var crypto = require("crypto");
var util = require("util");
const scrypt = util.promisify(crypto.scrypt);

let spawnPoints = require("../spawn_points.json").SpawnPoints;

mp.events.add("playerDeath", (player) => {
  player.spawn(spawnPoints[Math.floor(Math.random() * spawnPoints.length)]);
  player.health = 100;
});

const fs = require("fs");

mp.events.addCommand("savecam", (player, name = "No name") => {
  player.call("getCamCoords", [name]);
});
const saveFile = "savedposcam.txt";
mp.events.add(
  "saveCamCoords",
  (player, position, pointAtCoord, name = "No name") => {
    const pos = JSON.parse(position);
    const point = JSON.parse(pointAtCoord);

    fs.appendFile(
      saveFile,
      `Position: ${pos.x}, ${pos.y}, ${pos.z} | pointAtCoord: ${point.position.x}, ${point.position.y}, ${point.position.z} | entity: ${point.entity} - ${name}\r\n`,
      (err) => {
        if (err) {
          player.notify(`~r~SaveCamPos Error: ~w~${err.message}`);
        } else {
          player.notify(`~g~PositionCam saved. ~w~(${name})`);
        }
      }
    );
  }
);

// REGISTER AND LOGIN COMMANDS

/*mp.events.addCommand("register", (player, _, login, pass, rpass) => {
  if (login == undefined || pass == undefined || rpass == undefined)
    return player.outputChatBox(
      "Usage: /register [login] [password] [repeat_password]"
    );
  if (pass != rpass) return player.outputChatBox("Passwords do not match");

  const salt = crypto.randomBytes(8).toString("hex");
  crypto.scrypt(pass, salt, 32, (err, derivedKey) => {
    if (err) {
      throw new Error(err.message);
    }

    const password = salt + "." + derivedKey.toString("hex");

    DB.Handle.query(
      "INSERT INTO accounts (login,pass,socialClub,regIP,lastIP,regDate,lastDate) VALUES (?,?,?,?,?, NOW(), NOW())",
      [login, password, player.socialClub, player.ip, player.ip],
      (e) => {
        if (e) {
          return player.notify("~r~Error!");
          console.log(e);
        }
        player.notify("~g~Account created successfully");
      }
    );
  });
});*/

mp.events.add("loginToServer", (player, login, pass) => {
  DB.Handle.query(
    "SELECT * FROM accounts WHERE login = ? AND pass=?",
    [login, pass],
    (e, result) => {
      if (result[0]) {
        player.notify(`~g~You have successfully logged in, ${login}`);
        player.call("regSuccess");
        player.position = new mp.Vector3(100.08, -1951.92, 20.6011);
        player.dimension = 0;
      } else {
        return player.notify("~r~Invalid login or password");
      }
    }
  );
});

/* mp.events.addCommand("login", (player, _, login, pass) => {
  if (login == undefined || pass == undefined)
    return player.outputChatBox("Usage: /login [login] [password]");

  DB.Handle.query(
    "SELECT * FROM accounts WHERE login = ?",
    [login],
    (e, result) => {
      if (e) {
        return player.notify("~r~Error!");
        console.log(e);
      }
      if (result.length == 0)
        return player.notify("~r~Wrong login or password");

      const [salt, storedHash] = result[0].pass.split(".");
      crypto.scrypt(pass, salt, 32, (err, derivedKey) => {
        if (storedHash !== derivedKey.toString("hex")) {
          return player.notify("~r~Wrong login or password");
        }
      });

      player.notify("~g~You have successfully logged in.");
      DB.Handle.query(
        "UPDATE accounts SET lastIP = ?, lastDate=NOW() WHERE login = ?",
        [player.ip, login]
      );
    }
  );
}); */
