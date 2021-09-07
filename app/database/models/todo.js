const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    static getAllTodo() {
      return this.findAll().then((todoList) => todoList);
    };

    static getTodo(id) {
      return this.findByPk(id).then((todo) => todo);
    };

    static addTodo(params) {
      // ここを実装してね！
      return this.create(params)
        .then((todo) => todo)
        .catch(() => {
          errorMessage();
        });
    };

    static updateTodo(params, where) {
      // ここを実装してね！
      return this.update(params, where)
        .then((todo) => console.log(todo))
        .catch(() => {
          errorMessage();
        });
    };

    static deleteTodo(id) {
      // ここを実装してね！
      return this.destroy(id)
        .then((todo) => todo)
        .catch(() => {
          errorMessage();
        });
    };
  };

  const errorMessage = () => {
    console.log('データベース間のエラーが起きました。');
  };

  Todo.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
  }, {
    sequelize,
    underscored: true,
    modelName: 'Todo',
  });
  return Todo;
};
