const express = require('express');
const todosService = require('../services/todosService'); // Adjust the path as needed
const router = express.Router();


// Create a new todo
router.post('/create', async (req, res) => {
  try {
    const result = await todosService.createTodo(req.body);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error occurred while creating the todo.');
  }
});

router.get('/', async (req, res) => {
  try {
    const todos = await todosService.getAllTodos();
    res.send(todos);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error occurred while fetching todos.');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const result = await todosService.deleteTodo(req.params.id);
    res.status(200).send(result);
  } catch (error) {
    console.error('Error occurred while deleting the todo:', error);
    res.status(500).send('Error occurred while deleting the todo.');
  }
});

module.exports = router;
