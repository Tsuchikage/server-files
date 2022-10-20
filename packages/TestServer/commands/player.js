mp.events.addCommand("me", (player, message) => {
  if (message == undefined) return player.outputChatBox("Usage: /me [message]");
  mp.players.broadcastInRange(
    player.position,
    10,
    `!{AD35AB} * ${player.name} ${message}`
  );
});

mp.events.addCommand("do", (player, message) => {
  if (message == undefined) return player.outputChatBox("Usage: /do [message]");
  mp.players.broadcastInRange(player.position, 10, `!{00c4ff} * ${message}.`);
});

mp.events.addCommand("try", (player, message) => {
  if (message == undefined)
    return player.outputChatBox("Usage: /try [message]");
  let random = Math.floor(Math.random() * 2);
  if (random == 1) {
    mp.players.broadcastInRange(
      player.position,
      10,
      `!{fffa00} * ${player.name} ${message} | !{2FFA0A}Success!`
    );
  } else {
    mp.players.broadcastInRange(
      player.position,
      10,
      `!{fffa00} * ${player.name} ${message} | !{FF0000}Failed!`
    );
  }
});
