var player = mp.players.local;

mp.events.add("showRegisterWindow", () => {
  global.loginCamera = mp.cameras.new(
    "default",
    new mp.Vector3(-1479.23, -1271.86, 107, 86),
    new mp.Vector3(0, 0, 0),
    50
  );

  loginCamera.pointAtCoord(-1479.23, -1271.86, 107, 86);
  loginCamera.setActive(true);
  mp.game.cam.renderScriptCams(true, false, 0, true, false);
  player.freezePosition(true);
  mp.gui.chat.activate(false);
  //mp.gui.chat.show(false);
  mp.game.ui.displayRadar(false);
  mp.gui.cursor.visible = true;

  global.regBrowser = mp.browsers.new("package://TestClient/cef/auth.html");
});

mp.events.add("loginToClient", (login, pass) => {
  //   if (login.length < 5 || pass.length < 5)
  //     return mp.game.graphics.notify("~r~Login or password is too short");
  mp.events.callRemote("loginToServer", login, pass);
});

mp.events.add("regSuccess", () => {
  regBrowser.destroy();
  player.freezePosition(false);
  mp.gui.chat.activate(true);
  mp.gui.chat.show(true);
  mp.game.ui.displayRadar(true);
  mp.gui.cursor.visible = false;
  mp.game.cam.renderScriptCams(false, false, 0, false, false);
});
