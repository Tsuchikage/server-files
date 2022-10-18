let spawnPoints = require("./spawn_points.json").SpawnPoints;

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

mp.events.addCommand("register", (player, _, login, pass, rpass) => {
  if (login == undefined || pass == undefined || rpass == undefined)
    return player.outputChatBox(
      "Usage: /register login password repeat_password"
    );
  if (pass != rpass) return player.outputChatBox("Passwords do not match");
  DB.Handle.query(
    "INSERT INTO accounts (login,pass,socialClub,regIP,lastIP,regDate,lastDate) VALUES (?,?,?,?,?, NOW(), NOW())",
    [login, rpass, player.socialClub, player.ip, player.ip],
    (e) => {
      if (e) {
        return player.notify("~r~Error!");
        console.log(e);
      }
      player.notify("~g~Account created successfully");
    }
  );
});
