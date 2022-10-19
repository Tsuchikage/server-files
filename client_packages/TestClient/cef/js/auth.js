function submitForm(event) {
  event.preventDefault();

  const login = document.getElementById("login").value;
  const password = document.getElementById("password").value;

  mp.trigger("loginToClient", login, password);
}
