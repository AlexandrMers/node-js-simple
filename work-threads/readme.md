## Пример, как можно работать с потоками "work-threads" в node JS

### "файл `app.js` - пример синхронной работы (расставлены замеры производительности)
### "файл `app-with-threads.js` - пример работы с потоками (воркерами), где на каждый вызов функции `compute()` создается свой 