const { Todo } = require('../database/models');

module.exports = {
  getAllTodo: async (req, res, next) => {
    const todoList = await Todo.getAllTodo();
    res.render('index.ejs', {
      templateName: 'page/home.ejs',
      todoList,
      csrfToken: req.session.csrfToken,
    });
  },
  getTodoById: async (req, res, next) => {
    // ここを実装してね
    const todo = await Todo.getTodo(req.params.id);
    res.render('index.ejs', {
      templateName: 'page/detail.ejs',
      todo,
      csrfToken: req.session.csrfToken,
    });
  },
  addTodo: async (req, res, next) => {
    // ここを実装してね
    const param = {
      title: req.body['todo-title'],
      content: req.body['todo-content'],
    };
    await Todo.addTodo(param)
      .then(() => {
        redirectTodo(res);
      }).catch(() => {
        errorMessage(res);
      });
  },
  updateTodoById: async (req, res, next) => {
    // ここを実装してね
    const param = {
      title: req.body['todo-title'],
      content: req.body['todo-content'],
    }
    await Todo.updateTodo(param, { where: { id: req.params.id } })
      .then(() => {
        redirectTodo(res);
      })
      .catch(() => {
        errorMessage(res);
      });
  },
  deleteTodoById: async (req, res, next) => {
    // ここを実装してね
    await Todo.deleteTodo({ where: { id: req.params.id } })
      .then(() => {
        redirectTodo(res);
      })
      .catch(() => {
        errorMessage(res);
      });
  },
};

const errorMessage = (res) => {
  res.send('エラーが起きました。');
};

const redirectTodo = (res) => {
  res.redirect('/todo');
};