// Проверяем, есть ли сохранённый пользователь
const savedUser = localStorage.getItem("username");

if (!savedUser) {
  const authorizationForm=document.createElement("form");
  authorizationForm.classList.add("permission");
  document.querySelector("#comments").append(authorizationForm);

  const authorization=document.createElement("section");
  authorization.classList.add('login');
  authorizationForm.append(authorization);

  const input=document.createElement('input');
  input.setAttribute("name","name");
  input.setAttribute("type","text");
  input.setAttribute("id","login");
  input.setAttribute("placeholder","Login");
  authorization.append(input);

  const pass=document.createElement("input");
  pass.setAttribute("id","password");
  pass.setAttribute("type","password");
  pass.setAttribute("placeholder","password");
  authorization.append(pass);

  const push=document.createElement("button");
  push.setAttribute("id","push");
  push.textContent="Авторизироваться";
  authorization.append(push);

  
} else {
  // Если есть username, показываем сразу приветствие
  showUser(savedUser);
}

// ====== функция отрисовки приветствия ======
function showUser(username) {
  const userDisplay = document.createElement("div");
  userDisplay.textContent = `Привет, ${username}!`;
  userDisplay.style.fontWeight = "bold";
  userDisplay.style.marginBottom = "10px";
  document.querySelector("#comments").prepend(userDisplay);
}

// ====== форма для комментариев ======
const form=document.createElement('form');
form.classList.add('formWebWorkshop');
document.getElementById('comments').prepend(form);

const inputSecond=document.createElement('input');
inputSecond.setAttribute("name","message");
inputSecond.setAttribute("type","text");
inputSecond.setAttribute("id","messages");
inputSecond.setAttribute("placeholder","messages");
form.append(inputSecond);

const button=document.createElement('button');
button.textContent='send';
form.append(button);

const commentsList=document.createElement("div");
commentsList.setAttribute("id","comments-list");
document.querySelector("#comments").after(commentsList);

// ====== отправка комментария ======
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const data = {};
  formData.forEach((value, key) => data[key] = value);

  // ВАЖНО: добавляем имя из localStorage
  const user = localStorage.getItem("username");
  if (user) {
    data.name = user;
  }

  try {
    const response = await fetch("https://comments.qucu.ru/200", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    if (response.ok) {
      console.log("Комментарий отправлен!");
      button.disabled = true;
      form.reset();
    }
  } catch (err) {
    console.error("Сетевая ошибка:", err);
  }
});

// ====== логин ======
async function doLogin() {
  const login = document.getElementById("login").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("https://new.qucu.ru/login3", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ login, password })
    });

    const data = await res.json();
    console.log("Ответ сервера:", data);

    if (res.ok) {
      alert("Успешный вход!");
      localStorage.setItem("username", login);

      // убираем форму авторизации и выводим приветствие
      document.querySelector(".permission").remove();
      showUser(login);

      checkProfile();
    } else {
      alert(data.message || "Ошибка входа");
    }
  } catch (err) {
    console.error("Ошибка сети:", err);
  }
}

async function checkProfile() {
  const res = await fetch("https://new.qucu.ru/profile3", {
    method: "GET",
    credentials: "include"
  });
  const data = await res.json();
  console.log("Профиль:", data);
}

document.addEventListener("click", (e) => {
  if (e.target && e.target.id === "push") {
    e.preventDefault();
    doLogin();
  }
});
