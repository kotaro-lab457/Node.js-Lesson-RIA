const express = require('express');
const router = express.Router();
const todoController = require('../controllers/TodoController');
const { csrfProtection } = require('../middleware/csrf');

router.use(csrfProtection);

// メソッドチェーン！
// 一覧のルーティング
router
  .get('/todo', todoController.getAllTodo)
  .post('/todo', todoController.addTodo);

// ルーターレベルのミドルウェア
router.use('/todo/:id', (req, res, next) => {
  req.message = `ID: ${req.params.id}`;
  next();
}, (req, res, next) => {
  req.message += 'のtodoを';
  next();
}, (req, res, next) => {
  req.message += '表示しています。';
  console.log(req.message);
  next();
});


// 詳細のルーティング
router
  .get('/todo/:id', todoController.getTodoById)
  .put('/todo/:id', todoController.updateTodoById)
  .delete('/todo/:id', todoController.deleteTodoById);

// `app.js` で使うためにモジュール化する
module.exports = router;