// this site comments.qucu.ru
// require("dotenv").config() site/custom_modules/.env SESSION_SECRET
const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: '/var/www/site/custom_modules/.env' });
console.log("SESSION_SECRET:", process.env.SESSION_SECRET );

const express = require('express');
const app = express();
const port = 3000

const session = require('express-session');

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const jsonParser = express.json();
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

app.use(express.json());


const { setFips } = require('crypto');



app.set('views','public');
app.set("view engine", "ejs");
app.use(express.static('public'));
app.set('trust proxy', 1);

const requestLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 7,
  message: { error: 'Слишком много запросов, попробуйте позже.' }
});
// ,'https://amir248.github.io','https://github.qucu.ru'
const registerUrl=['https://qucu.ru'];
// const whitelist = ['https://qucu.ru'];



app.use(session({
  secret: process.env.SESSION_SECRET || "ONE_SECRET_FOR_ALL_SUBDOMAINS",
  resave: false,
  saveUninitialized: false,
  name: "connect.sid",
  cookie: {
    domain: ".qucu.ru",
    secure: true,
    sameSite: "none",
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 1 день
  }
}));
app.use((req, res, next) => {
  console.log("HOST:", req.headers.host);
  console.log("COOKIE:", req.headers.cookie);
  console.log("SESSION:", req.session);
  next();
});
// console.log("SESSION_SECRET:", process.env.SESSION_SECRET);
// app.get("/_debug/set-session", (req, res) => {
//   req.session.userId = 123;
//   res.send("Session set!");
// });

// function requireAuth(req, res, next) {
//   console.log("SID:", req.sessionID);
//   console.log("SESSION:", req.session);
//   console.log(" o_O ", req.session.id );
//   if (!req.session?.user) {
//     return res.status(401).json({ error: "Not authenticated" });
//   }
//   next();
// }
function requireAuth(req, res, next) {
  console.log("SID:", req.sessionID);
  console.log("SESSION:", req.session);
  console.log(" o_O ", req.session?.user );
  // console.log(" o_O ", req.session.login );
  //console.log(" USER ", req.session.user );
  if (!req.session?.user) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  next();
}

// function requireAuth(req, res, next) {
//   if (!req.session || !req.session.userId) {
//     return res.status(401).json({
//       error: "Not authenticated"
//     });
//   }

//   next();
// };//requireAuth

app.get("/protected", requireAuth, (req, res) => {
  res.send(`Hello user ${req.session.user.login}`);
});

app.get("/_debug/session", (req, res) => {
  req.session.test = "ok";
  req.session.user=req.session.userId;
  // req.session.user='oKi';
  // req.session.login='log';
  console.log(req.session.user);
  console.log(req.session);
  res.json(req.session);
});

app.get("/_debug/cookie", (req, res) => {
  res.json({
    cookie: req.headers.cookie || null,
    sid: req.sessionID || null,
    session: req.session || null
  });
});

app.use(cors({
  // origin: false , // чтобы не ставить Access-Control-Allow-Origin
  origin:["https://nasobe.ru",'https://qucu.ru','https://new.qucu.ru','https://madness.qucu.ru','https://send-json.qucu.ru','https://i.ytimg.com','https://comments.qucu.ru'],
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
  referrerPolicy: { policy: "strict-origin-when-cross-origin" }
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

// app.use(
//   helmet.contentSecurityPolicy({
//     useDefaults: true,
//     directives: {
//       "default-src": ["'self'", "https://qucu.ru"],
//       "script-src": [
//         "'self'",
//         "'unsafe-inline'",
//         "https://cdn.jsdelivr.net",
//         "https://comments.qucu.ru",
//         "https://new.qucu.ru",
//         "https://github.qucu.ru",
//         "https://nasobe.ru",
//         "https://qucu.ru",
//         "https://qucu.ru/landing-page"
//       ],
//       "style-src": [
//         "'self'",
//         "'unsafe-inline'",
//         "https://cdn.jsdelivr.net",
//         "https://comments.qucu.ru",
//         "https://new.qucu.ru",
//         "https://nasobe.ru",
//         "https://github.qucu.ru",
//         "https://qucu.ru"
//       ],
//       "img-src": [
//         "'self'",
//         "data:",
//         "https://cdn.jsdelivr.net",
//         "https://qucu.ru",
//         "https://comments.qucu.ru",
//         "https://new.qucu.ru",
//         "https://nasobe.ru",
//         "https://github.qucu.ru"
//       ],
//       "connect-src": [
//         "'self'",
//         "https://cdn.jsdelivr.net",
//         "https://comments.qucu.ru",
//         "https://new.qucu.ru",
//         "https://qucu.ru",
//         "https://nasobe.ru",
//         "https://github.qucu.ru"
//       ],
//       "script-src-elem": [
//       "'self'",
//       "https://challenges.cloudflare.com",
//       "https://cdn.jsdelivr.net",
//       "https://comments.qucu.ru",
//       "https://new.qucu.ru" // добавили
//     ],
//       "frame-ancestors": ["'self'", "https://cdn.jsdelivr.net","https://nasobe.ru","https://qucu.ru","https://qucu.ru/landing-page", "https://comments.qucu.ru", "https://new.qucu.ru"],
//       "object-src": ["'none'"]
//     }
//   })
// );

app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "default-src": ["'self'", "https://qucu.ru"],

      "script-src": [
        "'self'",
        "'unsafe-inline'",
        "https://challenges.cloudflare.com",
        "https://cdn.jsdelivr.net",
        "https://comments.qucu.ru",
        "https://new.qucu.ru",
        "https://github.qucu.ru",
        "https://nasobe.ru",
        "https://qucu.ru"
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
        "https://challenges.cloudflare.com",
        "https://qucu.ru",
        "https://comments.qucu.ru",
        "https://new.qucu.ru",
        "https://nasobe.ru",
        "https://github.qucu.ru"
      ],

      "connect-src": [
        "'self'",
        "https://challenges.cloudflare.com",
        "https://comments.qucu.ru",
        "https://new.qucu.ru",
        "https://qucu.ru"
      ],

      // 🔥 ВОТ КЛЮЧЕВОЙ МОМЕНТ
      "frame-src": [
        "https://challenges.cloudflare.com"
      ],

      // кто МОЖЕТ встраивать ТВОЙ сайт
      "frame-ancestors": [
        "'self'",
        "https://nasobe.ru",
        "https://send-json.qucu.ru/",
        "https://qucu.ru",
        "https://comments.qucu.ru",
        "https://new.qucu.ru"
      ],

      "object-src": ["'none'"]
    }
  })
);
// app.use(
//   helmet.contentSecurityPolicy({
//     directives: {
//       defaultSrc: ["'self'"],

//       scriptSrc: [
//         "'self'",
//         "https://challenges.cloudflare.com"
//       ],

//       styleSrc: [
//         "'self'",
//         "'unsafe-inline'" // если EJS / inline стили
//       ],

//       imgSrc: [
//         "'self'",
//         "data:",
//         "https:"
//       ],

//       connectSrc: [
//         "'self'",
//         "https://new.qucu.ru",
//         "https://comments.qucu.ru"
//       ],

//       frameSrc: [
//         "https://challenges.cloudflare.com"
//       ],

//       objectSrc: ["'none'"],
//       baseUri: ["'self'"],
//       formAction: ["'self'"],
//       frameAncestors: ["'none'"]
//     }
//   })
// );


//requireAuth,
app.get('/',  (request, response) => {
  response.render('indexPage', { title: 'My Express App', text: 'Hello from comments from NODE.JS!', userId : "7" });
});
app.get('/onclicker',(request,response)=>{
  response.render('onclicker',{oK: 'onClick'});
});

// app.set('trust proxy', true);

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

// Скрипт без капчи
app.get("/no-captcha/:id", (req, res) => {
  const id = req.params.id;
  console.log("JS requested (no captcha) for id:", id);

  fs.readFile("public/script/1script.js", "utf8", (error, data) => {
    if (error) {
      console.error("Error reading file:", error);
      return res.sendStatus(500);
    }

    const injected = `const ID_FROM_SERVER = "${id}";\n` + data;
    console.log("GET 1script.js (no captcha)");
    res.type("application/javascript").send(injected);
  });
});
app.get("/js/:id", (req, res) => {
  const id = req.params.id;  // <-- вот тут он будет
  console.log("JS requested for id:", id);
  fs.readFile("public/script/1scriptCaptcha.js", "utf8", (error, data) => {
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
    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    // 🔥 СОЗДАЁМ СЕССИЮ ЗДЕСЬ
    req.session.user = data.user;
    console.log(data.user, "data USER");
    // 🔥 ОБЯЗАТЕЛЬНО ОТВЕТ
    return res.json({
      success: true,
      user: data.user
    });

  } catch (err) {
    console.error("Ошибка прокси:", err);
    return res.status(500).json({
      success: false,
      message: "Ошибка связи с сервером авторизации",
    });
  }
});
// app.post("/login3-proxy-captcha", async (req, res) => {
//   try {
//     const captchaToken = req.body["cf-turnstile-response"];

//     if (!captchaToken) {
//       return res.status(400).json({
//         success: false,
//         message: "Captcha token missing",
//       });
//     }

//     // 1️⃣ Проверяем Turnstile
//     const verifyRes = await fetch(
//       "https://challenges.cloudflare.com/turnstile/v0/siteverify",
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/x-www-form-urlencoded" },
//         body: new URLSearchParams({
//           secret: process.env.SECRETCLOUDFLARE, // ❗ secret key
//           response: captchaToken,
//           remoteip: req.ip,
//         }),
//       }
//     );

//     const verifyData = await verifyRes.json();

//     if (!verifyData.success) {
//       return res.status(403).json({
//         success: false,
//         message: "Captcha verification failed",
//       });
//     }

//     // 2️⃣ Убираем токен капчи перед проксированием
//     const cleanBody = { ...req.body };
//     delete cleanBody["cf-turnstile-response"];

//     // 3️⃣ Проксируем запрос на реальный auth-сервер
//     const response = await fetch("http://192.168.1.177:3700/login3", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(cleanBody),
//     });

//     if (!response.ok) {
//       const errorData = await response.json().catch(() => ({}));
//       return res.status(response.status).json({
//         success: false,
//         message: errorData.message || "Ошибка при авторизации",
//       });
//     }

//     const data = await response.json();
//     return res.json({ success: true, ...data });

//   } catch (err) {
//     console.error("Ошибка прокси + captcha:", err);
//     return res.status(500).json({
//       success: false,
//       message: "Ошибка связи с сервером авторизации",
//     });
//   }
// });

app.post("/login3-proxy-captcha", async (req, res) => {
  try {
    const captchaToken = req.body["cf-turnstile-response"];

    if (!captchaToken) {
      return res.status(400).json({
        success: false,
        message: "Captcha token missing",
      });
    }

    // 1️⃣ Проверка Turnstile
    const verifyRes = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret: process.env.SECRETCLOUDFLARE,
          response: captchaToken,
          remoteip: req.ip,
        }),
      }
    );

    const verifyData = await verifyRes.json();

    if (!verifyData.success) {
      return res.status(403).json({
        success: false,
        message: "Captcha verification failed",
      });
    }

    // 2️⃣ Чистим body
    const cleanBody = { ...req.body };
    delete cleanBody["cf-turnstile-response"];

    // 3️⃣ Прокси на auth-сервер
    const response = await fetch("http://192.168.1.177:3700/login3", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cleanBody),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return res.status(response.status).json({
        success: false,
        message: errorData.message || "Ошибка при авторизации",
      });
    }

    const data = await response.json();

    // 🔥🔥🔥 СОЗДАЁМ СЕССИЮ
    req.session.user = data.user;   // <- ВАЖНО
    req.session.workingTest = "ok_O_o";        // видел в cookie 😉
    req.session.anticommunist="777";

    // ⚠️ гарантируем сохранение
    req.session.save(err => {
      if (err) {
        console.error("Session save error:", err);
        return res.status(500).json({
          success: false,
          message: "Session save failed",
        });
      }

      return res.json({
        success: true,
        user: data.user,
      });
    });

  } catch (err) {
    console.error("Ошибка прокси + captcha:", err);
    return res.status(500).json({
      success: false,
      message: "Ошибка связи с сервером авторизации",
    });
  }
});


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
}); // app.get



// POST комментария
app.post("/:id/:type",requireAuth, (req, res) => {
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
});//POST comments


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})
