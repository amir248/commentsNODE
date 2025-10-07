// Берём путь страницы и формируем API-адрес
let pagePath = window.location.pathname; 
// уберём начальный слэш и заменим пустую строку на "comments"
if (pagePath === "/" || pagePath === "") {
  pagePath = "comments"; 
} else {
  pagePath = pagePath.replace(/^\/+/, ""); 
}

// итоговый URL API
const API_URL = `https://comments.qucu.ru/${pagePath}`;
console.log("API для этой страницы:", API_URL);

// добавляем имя из LocalStorage
const savedUser = localStorage.getItem("username");
const d = new Date();

// форма комментариев
const form = document.createElement("form");
form.classList.add("formWebWorkshop");
document.getElementById("comments").prepend(form);

const inputMessage = document.createElement("input");
inputMessage.name = "message";
inputMessage.type = "text";
inputMessage.id = "messages";
inputMessage.placeholder = "Введите сообщение";
form.append(inputMessage);

const sendButton = document.createElement("button");
sendButton.textContent = "Отправить";
sendButton.disabled = true;
form.append(sendButton);

const commentsList = document.createElement("div");
commentsList.id = "comments-list";
document.querySelector("#comments").after(commentsList);

// блокировка кнопки, пока сообщение короткое
inputMessage.addEventListener("input", () => {
  sendButton.disabled = inputMessage.value.trim().length < 2;
});

// загрузка комментариев
async function loadComments() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Ошибка загрузки");
    const comments = await res.json();

    commentsList.innerHTML = "";
    comments.forEach(c => {
      const item = document.createElement("div");
      item.classList.add("comment");
      item.innerHTML = `<b>${c.name}</b>: ${c.message} <span>${c.date || ""}</span>`;
      commentsList.appendChild(item);
    });
  } catch (err) {
    console.error("Ошибка при загрузке:", err);
  }
}
setInterval(loadComments, 7000);
loadComments();

// отправка комментария
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    name: savedUser || "guest",
    message: inputMessage.value,
    date: d.toISOString(),
    loc: window.location.href
  };

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    if (res.ok) {
      console.log("Комментарий отправлен");
      form.reset();
      sendButton.disabled = true;
      loadComments();
    } else {
      console.error("Ошибка отправки");
    }
  } catch (err) {
    console.error("Сетевая ошибка:", err);
  }
});
