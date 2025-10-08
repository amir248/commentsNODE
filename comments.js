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
  origin:['https://qucu.ru','https://new.qucu.ru','https://madness.qucu.ru','https://send-json.qucu.ru','https://i.ytimg.com'],
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

app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; connect-src 'self' https://comments.qucu.ru; style-src 'self' 'unsafe-inline' https://comments.qucu.ru; script-src 'self' 'unsafe-inline' https://comments.qucu.ru;"
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
        "https://qucu.ru",
        "https://qucu.ru/landing-page"
      ],
      "style-src": [
        "'self'",
        "'unsafe-inline'",
        "https://cdn.jsdelivr.net",
        "https://comments.qucu.ru",
        "https://new.qucu.ru",
        "https://github.qucu.ru",
        "https://qucu.ru"
      ],
      "img-src": [
        "'self'",
        "data:",
        "https://qucu.ru",
        "https://comments.qucu.ru",
        "https://new.qucu.ru",
        "https://github.qucu.ru"
      ],
      "connect-src": [
        "'self'",
        "https://comments.qucu.ru",
        "https://new.qucu.ru",
        "https://qucu.ru",
        "https://github.qucu.ru"
      ],
      "frame-ancestors": ["'self'", "https://qucu.ru","https://qucu.ru/landing-page", "https://comments.qucu.ru", "https://new.qucu.ru"],
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


// OPTIONS (CORS)
app.options("/:id/:type", (req, res) => {
  res.header("Access-Control-Allow-Origin", "https://send-json.qucu.ru");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Credentials", "true");
  res.sendStatus(204);
});

// // GET комментариев
// app.get("/:type/:id?", (req, res) => {
//   const { type, id } = req.params;
//   const file = id ? `${type}-${id}.json` : `${type}.json`;

//   try {
//     const comments = JSON.parse(fs.readFileSync(file, "utf-8"));
//     res.json(comments);
//   } catch {
//     res.json([]);
//   }
// });

// // POST комментария
// app.post("/:type/:id?", (req, res) => {
//   const { type, id } = req.params;
//   const file = id ? `${type}-${id}.json` : `${type}.json`;

//   const comment = req.body;
//   let comments = [];
//   try {
//     comments = JSON.parse(fs.readFileSync(file, "utf-8"));
//   } catch {}

//   comments.unshift(comment);
//   fs.writeFileSync(file, JSON.stringify(comments, null, 2));
//   res.send({ status: "ok" });
// });

// let pathoK="200";
// app.options("/"+`${pathoK}`, (req, res) => {
//   // res.header("Access-Control-Allow-Origin", "https://send-json.qucu.ru");
//   // res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
//   // res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   // res.header("Access-Control-Allow-Credentials", "true");
//   // res.sendStatus(204);
//   res.header("Access-Control-Allow-Origin", "https://send-json.qucu.ru");
//   res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
//   res.header("Access-Control-Allow-Headers", "Content-Type");
//   res.header("Access-Control-Allow-Credentials", "true");
// });

app.post("/login3-proxy", async (req, res) => {
  try {
    const response = await fetch("http://192.168.1.177:3700/login3", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Ошибка прокси:", err);
    res.status(500).json({ error: err.message });
  }
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
// CSS
app.get("/style", (req, res) => {
  fs.readFile("public/web-workshop.css", "utf8", (err, data) => {
    if (err) return res.sendStatus(500);
    res.type("text/css").send(data);
  });
});
// app.get("/"+`${pathoK}`, (req, res) => {
//   try {
//     const comments = JSON.parse(fs.readFileSync(`${pathoK}`+".json", "utf-8"));
//     res.json(comments);
//   } catch {
//     res.json([]);
//   }
// });

// app.get("/:id/:type", (req, res) => {
//   const { type, id } = req.params;
//   const file = id ? `${id}-${type}.json` : `${type}.json`;

//   try {
//     const comments = JSON.parse(fs.readFileSync(file, "utf-8"));
//     res.json(comments);
//   } catch {
//     res.json([]);
//   }
// });
// // POST комментария
// app.post("/:id/:type", (req, res) => {
//   const { type, id } = req.params;
//   const file = id ? `${id}-${type}.json` : `${type}.json`;

//   const comment = req.body;
//   let comments = [];
//   try {
//     comments = JSON.parse(fs.readFileSync(file, "utf-8"));
//   } catch {}

//   comments.unshift(comment);
//   fs.writeFileSync(file, JSON.stringify(comments, null, 2));
//   res.send({ status: "ok" });
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
//******************************************************************************************************************
// ----------------------------BOX comments system------------
// *******************************************************************************************************************
// app.post('/xxx',jsonParser,(request,response)=>{
//   console.log(__dirname + " dirname");
//   console.log(request.body);
//   console.log("hello world! ");
//   let ress=console.log('oK!!!');
//   const a111 = '/public/allDiscus/a111';
//   fs.mkdir(a111,{recursive:true},(err)=>{
//     if(err){
//       console.error('eroor between create  folder, err');
//     }else{
//       console.log('create fodder was excessufull');
//     }
//   })
//   try {
//     fs.writeFileSync('/public/allDiscus/111/my_file.json', 'Содержимое файла');
//     console.log('Файл создан');
//     console.log('oK');
//   } catch (err) {
//     console.error(err);
//   }
//   response.send(ress);
// });

// const importantBag={}
// if(importantBag=={}){
//   console.log('bag there exists');
// }else{
//   console.log(importantBag.id);
//   console.log('bag empty');
// }
// const id=['a000','a001','a002','a003','a004','a005','a777','git','nasoberu','test','resume','sweb','blozh','mad','blozhik','google'];

// let x = `${importantBag.id}`;
// const comments = commentsFn(app,requestLimiter, jsonParser, cors, fs, id, importantBag,path);

// for(let i=0; i<id.length;i++){
//   comments(i);
// }

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})
