const Todo = require('../models/todo');

// Create a new todo
const createTodo = async (todoData) => {
  try {
    const todo = new Todo(todoData);
    const result = await todo.save();
    return result;
  } catch (error) {
    throw error;
  }
};

// Get all todos
const getAllTodos = async (params) => {
    try {
      const { priority } = params;
      const query = {};
  
      if (priority) {
        query.priority = priority;
      }
      const todos = await Todo.find(query);
  
      return todos;
    } catch (error) {
      throw error;
    }
  };
  

// Delete a todo by ID
const deleteTodo = async (todoId) => {
  try {
    const deletedTodo = await Todo.findOneAndDelete({ _id: todoId });
    if (!deletedTodo) {
      throw new Error('Todo not found.');
    }
    return 'Todo deleted successfully.';
  } catch (error) {
    throw error;
  }
};

module.exports = { createTodo, getAllTodos, deleteTodo };
