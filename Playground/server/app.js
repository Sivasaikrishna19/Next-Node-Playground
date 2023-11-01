const express = require('express')
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const Todo = require('./models/todo')
var cors = require('cors');


const app = express()
app.use(express.json());
app.use(cors());

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}))

const dbURI = 'mongodb+srv://sivasaikrishna25301:Siva7781@nodetut.cdkzjho.mongodb.net/'

mongoose.connect(dbURI,{useNewUrlParser:true,useUnifiedTopology:true}).then((result)=>{
    app.listen(5000);
}).catch((e)=>{console.log(e)});

app.post('/todos/create', (req, res) => {
    const todo = new Todo(req.body);
  
    todo.save()
      .then((result) => {
        res.send(result);
      })
      .catch((e) => {
        console.log(e);
        res.status(500).send('Error occurred while creating the todo.');
      });
  });
  
  app.get('/todos', (req, res) => {
    Todo.find({})
      .then((todos) => {
        res.send(todos);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send('Error occurred while fetching todos.');
      });
  });

app.delete('/todos/:id', (req, res) => {
  const todoId = req.params.id;
  Todo.findOneAndDelete({ _id: todoId })
    .then((deletedTodo) => {
      if (!deletedTodo) {
        return res.status(404).send('Todo not found.');
      }
      return res.status(200).send('Todo deleted successfully.');
    })
    .catch((error) => {
      console.error('Error occurred while deleting the todo:', error);
      res.status(500).send('Error occurred while deleting the todo.');
    });
});
  

  
  