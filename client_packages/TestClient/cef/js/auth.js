function login(event) {
  event.preventDefault();

  const login = document.getElementById("loginL").value;
  const password = document.getElementById("passwordL").value;

  console.log(password);
  console.log(login);

  mp.trigger("loginToClient", login, password);
}

function register(event) {
  event.preventDefault();

  const login = document.getElementById("loginR").value;
  const password = document.getElementById("passwordR").value;

  console.log(password);
  console.log(login);
  // todo
  mp.trigger("registerToClient", login, password);
}
