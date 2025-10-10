// this site comments.qucu.ru
const express = require('express');
const app = express();
const port = 3000

const jsonParser = express.json();
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

app.use(express.json());

const path = require('path');
const fs = require('fs');
const { setFips } = require('crypto');
// app.use('/static', express.static(path.join(__dirname, 'public')))

// const commentsFn = require('./modules/newComments');
// const commentsFn = require('./modules/oldComments');
const requestLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 7,
  message: { error: 'Слишком много запросов, попробуйте позже.' }
});
// ,'https://amir248.github.io','https://github.qucu.ru'
const registerUrl=['https://qucu.ru'];
// const whitelist = ['https://qucu.ru'];
app.use(cors({
  // origin: false , // чтобы не ставить Access-Control-Allow-Origin
  origin:["https://nasobe.ru",'https://qucu.ru','https://new.qucu.ru','https://madness.qucu.ru','https://send-json.qucu.ru','https://i.ytimg.com'],
  // origin: function (origin, callback) {
  //   if (!origin || whitelist.includes(origin)) {
  //     callback(null, origin);
  //   } else {
  //     callback(new Error('Not allowed by CORS'));
  //   }
  // },
  methods:['POST', 'GET', 'OPTIONS'],
  optionsSuccessStatus: 200,
  credentials: true,
  allowedHeaders: ['Origin', 'Content-Type', 'Accept', 'Authorization']
  // allowedHeaders: '*'
}));


// Helmet: безопасные заголовки
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginResourcePolicy: false,
  crossOriginEmbedderPolicy: false,
}));
// app.use(helmet());

// app.use((req, res, next) => {
//   res.setHeader(
//     "Content-Security-Policy",
//     "default-src 'self'; connect-src 'self' https://comments.qucu.ru; style-src 'self' 'unsafe-inline' https://comments.qucu.ru; script-src 'self' 'unsafe-inline' https://comments.qucu.ru;"
//   );
//   next();
// });
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; connect-src 'self' https://comments.qucu.ru https://nasobe.ru; style-src 'self' 'unsafe-inline' https://comments.qucu.ru https://nasobe.ru; script-src 'self' 'unsafe-inline' https://comments.qucu.ru https://nasobe.ru;"
  );
  next();
});

app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "default-src": ["'self'", "https://qucu.ru"],
      "script-src": [
        "'self'",
        "'unsafe-inline'",
        "https://cdn.jsdelivr.net",
        "https://comments.qucu.ru",
        "https://new.qucu.ru",
        "https://github.qucu.ru",
        "https://nasobe.ru",
        "https://qucu.ru",
        "https://qucu.ru/landing-page"
      ],
      "style-src": [
        "'self'",
        "'unsafe-inline'",
        "https://cdn.jsdelivr.net",
        "https://comments.qucu.ru",
        "https://new.qucu.ru",
        "https://nasobe.ru",
        "https://github.qucu.ru",
        "https://qucu.ru"
      ],
      "img-src": [
        "'self'",
        "data:",
        "https://qucu.ru",
        "https://comments.qucu.ru",
        "https://new.qucu.ru",
        "https://nasobe.ru",
        "https://github.qucu.ru"
      ],
      "connect-src": [
        "'self'",
        "https://comments.qucu.ru",
        "https://new.qucu.ru",
        "https://qucu.ru",
        "https://nasobe.ru",
        "https://github.qucu.ru"
      ],
      "frame-ancestors": ["'self'", "https://nasobe.ru","https://qucu.ru","https://qucu.ru/landing-page", "https://comments.qucu.ru", "https://new.qucu.ru"],
      "object-src": ["'none'"]
    }
  })
);


app.set('views','public');
app.set("view engine", "ejs");
app.use(express.static('public'));

app.get('/', (request, response) => {
  response.render('indexPage', { title: 'My Express App', text: 'Hello from comments from NODE.JS!', userId : "7" });
});
app.get('/onclicker',(request,response)=>{
  response.render('onclicker',{oK: 'onClick'});
});

// app.set('trust proxy', true);
app.set('trust proxy', 1);
// Ограничение частоты запросов
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: 'Слишком много запросов. Попробуйте позже.'
});

// app.use('/getIp', limiter);
// app.use('/allow-cors', limiter);
app.use('/nasoberu', limiter);
app.use('/blozh', limiter);
app.use('/bozhik', limiter);
app.use('/a000', limiter);

// res.cookie('twk_uuid', 'значение', {
//   httpOnly: true,     // доступно только серверу
//   secure: true,       // работает только через HTTPS
//   sameSite: 'None'    // разрешает кросс-доменные запросы
// });

// cors(),
app.post("/getIp",jsonParser,(request,response)=>{
  // response.setHeader('Content-Type', 'application/javascript');
  // response.sendFile(path.join(__dirname, 'public', 'json', 'ip.js'));
  console.log("getIP getIp <----------------------------------------------");
  console.log(request.body);
  let writesFile=request.body;
  fs.appendFileSync("public/json/ip.js", `${JSON.stringify(writesFile)}`+"\n");
});

// cors(),
app.post('/allow-cors',jsonParser,(request,response)=>{
    console.log(__dirname + " 121 file index");
    console.log(request.body);
    // console.log(request);
    // console.log(response);
  if (!request.body) return response.sendStatus(400);
  let scriptComments=fs.readFileSync('public/script/script.js',"utf8",
  (error,data)=>{
    console.log("Async read file script.js");
    if(error) throw error;
    console.log(data);
  });
  response.send(scriptComments);
  // console.log(scriptComments);
});// SCRIPT JS

//style CSS
app.get("/style", (req, res) => {
  const origin = req.headers.origin;
  const allowedOrigins = [
    "https://nasobe.ru",
    "https://qucu.ru",
    "https://new.qucu.ru",
    "https://github.qucu.ru"
  ];

  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
  }
  // res.sendStatus(204); // No Content
  fs.readFile("public/web-workshop.css", "utf8", (err, data) => {
    if (err) return res.sendStatus(500);
    res.type("text/css").send(data);
  });
});


app.get("/js/:id", (req, res) => {
  const id = req.params.id;  // <-- вот тут он будет
  console.log("JS requested for id:", id);
  fs.readFile("public/script/1script.js", "utf8", (error, data) => {
    if (error) {
      console.error("Error reading file:", error);
      return res.sendStatus(500);
    }
    // Вставляем переменную id внутрь скрипта
    const injected = `const ID_FROM_SERVER = "${id}";\n` + data;
    // console.log(injected);
    console.log("GET 1script.js");
    res.type("application/javascript").send(injected);
  });
});
app.post("/login3-proxy", async (req, res) => {
  try {
    const response = await fetch("http://192.168.1.177:3700/login3", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    // проверяем статус
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return res.status(response.status).json({
        success: false,
        message: errorData.message || "Ошибка при авторизации",
      });
    }

    const data = await response.json();
    return res.json({ success: true, ...data });

  } catch (err) {
    console.error("Ошибка прокси:", err);
    return res.status(500).json({
      success: false,
      message: "Ошибка связи с сервером авторизации",
    });
  }
});
// app.post("/login3-proxy", async (req, res) => {
//   try {
//     const response = await fetch("http://192.168.1.177:3700/login3", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(req.body),
//     });

//     const data = await response.json();
//     res.json(data);
//   } catch (err) {
//     console.error("Ошибка прокси:", err);
//     res.status(500).json({ error: err.message });
//   }
// });

// GET комментариев
app.get("/:id/:type", (req, res) => {
  const { id } = req.params;
  let type = decodeURIComponent(req.params.type); // "blozhik/landing_full_stack"

  // Заменяем все слэши на дефисы
  type = type.replace(/\//g, "-");

  const file = `comments/${id}/${type}.json`;

  try {
    const comments = JSON.parse(fs.readFileSync(file, "utf-8"));
    res.json(comments);
  } catch {
    res.json([]);
  }
});



// POST комментария
app.post("/:id/:type", (req, res) => {
  const id = req.params.id;
  let type = decodeURIComponent(req.params.type);
  type = type.replace(/\//g, "-");

  const dir = path.join(__dirname, "comments", id);
  const file = path.join(dir, `${type}.json`);

  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const comment = req.body;
  let comments = [];
  try {
    comments = JSON.parse(fs.readFileSync(file, "utf-8"));
  } catch {}

  comments.unshift(comment);
  fs.writeFileSync(file, JSON.stringify(comments, null, 2));
  res.send({ status: "ok" });
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})
