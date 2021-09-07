const express = require('express');
const path = require('path');
const app = express();
const methodOverride = require('method-override');
const todo = require('./routes/todo');
const session = require('express-session');
const csurf = require('csurf');
require('dotenv').config();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(methodOverride('_method'));

app.use(session({                 // セッションを使えるようにする
  secret: process.env.SECRET_KEY, // 暗号化に使う文字列を指定する
  resave: false,
  saveUninitialized: false,
}));

app.use(csurf()); // req.csrfToken()を使えるようにする

// app.use('/', (req, res, next) => {
//   const csrfToken = req.csrfToken(); // token生成
//   req.session.csrfToken = csrfToken; // セッションにtokenを保存
//   console.log('csrfToken:', csrfToken);
//   next();
// });

// エラー処理のミドルウェア
app.use('/', (err, req, res, next) => {
  res.send(err);
});

// // アプリケーションへアクセスした時にmミドルウェアがよばれるようにする。
// app.use('/',middlewareOfApplicationLevel);

// 第一引数の`/`は暗黙的に先頭部分に `http://localhost:3000` が追加される
// 上記のurlにアクセスがきたら第二引数のrouteが呼ばれる
app.use('/', todo); // 追加

app.listen(3000, () => {
  console.log('Server started on port 3000');
});