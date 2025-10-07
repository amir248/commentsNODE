{/* <div id="comments"></div>

<script type="text/javascript">
const loginAndSite = {
  origin: 'https://github.qucu.ru/',
  referrer: 'https://github.qucu.ru/folder/'
}; */}

const importantBag = { id: "git", site: window.location };
const url777 = 'https://comments.qucu.ru/';

// --- Создание формы ---
const commentsContainer = document.querySelector('#comments');

const form = document.createElement('form');
form.setAttribute('name', 'registerForm');
form.setAttribute('id', 'registerForm');
form.setAttribute('method', 'POST');
commentsContainer.append(form);

const fieldset = document.createElement('fieldset');
form.append(fieldset);

const legend = document.createElement('legend');
legend.textContent = 'CommentarySystem Baron Sajtoverstausen';
fieldset.append(legend);

// Имя пользователя
const inputName = document.createElement('input');
inputName.setAttribute('name', 'login');
inputName.setAttribute('placeholder', 'Name');
inputName.setAttribute('id', 'nameCommentsSystem');
inputName.required = true;
fieldset.append(inputName);

// Сообщение
const inputMessage = document.createElement('input');
inputMessage.setAttribute('name', 'message');
inputMessage.setAttribute('id', 'message');
inputMessage.setAttribute('placeholder', 'Message');
inputMessage.required = true;
inputMessage.style.width = "calc(100% - 2px)";
fieldset.append(inputMessage);

// Кнопка отправки
const button = document.createElement('button');
button.setAttribute('type', 'button');
button.setAttribute('id', 'start');
button.textContent = 'Send';
fieldset.append(button);

// Контейнер сообщений
const messages = document.createElement('div');
messages.setAttribute('id', 'messages');
commentsContainer.append(messages);

// --- Функция проверки формы ---
function validateForm() {
  const nameLength = inputName.value.trim().length;
  const messageLength = inputMessage.value.trim().length;

  button.disabled = !(nameLength > 2 && messageLength > 7);

  inputName.style.background = nameLength > 2 ? 'rgba(0,255,0,0.1)' : 'rgba(255,0,0,0.1)';
  inputMessage.style.background = messageLength > 7 ? 'rgba(0,255,0,0.1)' : 'rgba(255,0,0,0.1)';
}

// --- Событие на input ---
inputName.addEventListener('input', validateForm);
inputMessage.addEventListener('input', validateForm);

// --- Функция отправки комментария ---
async function sendComment() {
  const userName = DOMPurify.sanitize(inputName.value, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
  const message = DOMPurify.sanitize(inputMessage.value, { ALLOWED_TAGS: ['b','i','em','strong','a','p','br'], ALLOWED_ATTR: ['href','target'] });

  const payload = {
    userName,
    message,
    date: new Date(),
    idea: importantBag
  };

  const puto3 = `${url777}${importantBag.id}.json/post`;

  try {
    const response = await fetch(puto3, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors',
      credentials: 'include',
      body: JSON.stringify(payload)
    });

    if (!response.ok) throw new Error(`Ошибка: ${response.status} ${response.statusText}`);

    const result = await response.json();
    console.log("Ответ сервера:", result);
    inputMessage.value = '';
    validateForm();
    loadComments(); // обновление списка сообщений
  } catch (err) {
    console.error("Ошибка при отправке комментария:", err);
  }
}

// --- Клик по кнопке ---
button.addEventListener('click', sendComment);

// --- Функция загрузки комментариев ---
async function loadComments() {
  const jsonUrl = `${url777}${importantBag.id}.json`;
  try {
    const response = await fetch(jsonUrl, { mode: 'cors', credentials: 'include' });
    if (!response.ok) throw new Error('Ошибка при получении комментариев');

    const messageList = await response.json();
    messages.innerHTML = '';

    messageList.forEach(msg => {
      const box = document.createElement('div');
      box.className = 'box';

      const userEl = document.createElement('p');
      userEl.innerHTML = `<span style="color:red;">${msg.userName}</span>`;
      box.append(userEl);

      const msgEl = document.createElement('p');
      msgEl.innerHTML = `<span style="color:grey;">${msg.message}</span>`;
      box.append(msgEl);

      const dateEl = document.createElement('p');
      dateEl.innerHTML = `<span style="color:blue;">${msg.date}</span>`;
      box.append(dateEl);

      const hr = document.createElement('hr');
      box.append(hr);

      messages.append(box);
    });
  } catch (err) {
    console.error(err);
  }
}

// --- Инициализация ---
loadComments();
setInterval(loadComments, 7000);
validateForm();
</script>
