const express = require('express');
const app = express();
const session = require('express-session');
const redis = require('redis');
const { RedisStore } = require('connect-redis'); // Правильный импорт

// Создание Redis-клиента
const redisClient = redis.createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379'
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));

(async () => {
  try {
    await redisClient.connect(); // Подключение к Redis

    // Создание хранилища сессий (исправлено!)
    const store = new RedisStore({
      client: redisClient,
      // Дополнительные опции (если нужны)
      // disableTouch: true,
      // ttl: 60 * 60 // 1 час
    });

    app.use(session({
      store: store,
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false, // В разработке можно false
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 1 день
      }
    }));

    // ... остальной код приложения ...

  } catch (err) {
    console.error('Ошибка при запуске сервера:', err);
    process.exit(1);
  }
})();
