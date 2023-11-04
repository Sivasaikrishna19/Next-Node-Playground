const Todo = require('../models/todo'); // Update the path to the Todo model if necessary

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
const getAllTodos = async () => {
  try {
    const todos = await Todo.find({});
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
