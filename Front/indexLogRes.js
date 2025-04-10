
//Registro
function guardarInfoRegistro() {
  const userData = {
    n1: document.getElementById("name1id").value,
    n2: document.getElementById("name2id").value,
    s1: document.getElementById("surname1id").value,
    s2: document.getElementById("surname2id").value,
    user: document.getElementById("userid").value,
    pwd: document.getElementById("passwordid").value,
  }

  const userDataJson = JSON.stringify(userData);
  console.log(userDataJson);

  fetch("http://127.0.0.1:3000/registerUser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: userDataJson,
  }).then((result) => {
    document.getElementById("regUser").reset();
    window.location.href = "login.html";
  });
}

//Loggin
async function guardarInfoLogin() {
  const userData = {
    user: document.getElementById("userid").value,
    pwd: document.getElementById("passwordid").value,
  }

  console.log(userData);

  const pwdR = await showPassword(userData.user);
  console.log("pwdR: " + pwdR);

  if (pwdR == userData.pwd) {
    console.log("ADELANTE");
    if  (userData.user == "admin") {
      window.location.href = "admin_2.html";
    } else {
      window.location.href = "portal.html";
    }
  }
  else if (pwdR == "-userNotFound-")
    alert("Usuario inexistente");
  else
    alert("Contraseña incorrecta");
}

async function showPassword(userId) {
  const password = await fetch("http://127.0.0.1:3000/loginUser?userId=" + userId + "");
  passwordJson = await password.json();
  if (passwordJson == "")
    pwdRequested = "-userNotFound-"
  else
    pwdRequested = passwordJson[0].pwd
  return pwdRequested;
}
