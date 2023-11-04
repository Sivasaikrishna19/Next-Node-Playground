const express = require('express')
const mongoose = require('mongoose');
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




app.use('/todos', require('./controllers/todoController')); // Import and use the todos routes



  
  