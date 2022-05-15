const express = require("express");
const bodyParser = require("body-parser");
const Task = require('./models/task');
const mongoose = require('mongoose');



const app = express();
mongoose.connect('mongodb://localhost:27017/KANBAN').
  catch(error => handleError(error));

/*app.use((req, res, next)=>{
    console.log('First Middleware');
    next();
});

app.use((req, res, next)=>{
    res.send('Hello from express!');
});*/

async function run() {
    try {
            await mongoose.connect('mongodb://localhost:27017/KANBAN');
        } catch (error) {
              handleError(error);
            }
}

run();

app.use(bodyParser.json());

app.use((req, res, next)=>{
    //this means no matter which domain sending request it is allowed to access server
    res.setHeader("Access-Control-Allow-Origin","*");
    // allow types of headers
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    //allow methods that we want to make accessible
    res.setHeader('Access-Control-Allow-Methods',"GET,POST,PUT,DELETE,OPTIONS");
    next();
});

app.get('/api/tasks',(req, res)=>{
    
    //res.send("Hello from improved server!");
    Task.find().then(documents => {
        res.status(200).json({
            message: "Task  received successfully",
            tasks: documents
        });
    });
   
});

app.post('/api/tasks',(req, res)=>{
   
    const task = new Task({
        task_name:  req.body.task_name,
        task_description:req.body.task_description,
        assignee:req.body.assignee,
        start_date:req.body.start_date,
        due_date:req.body.due_date,
        status:req.body.status
    });
    console.log('Task Received', task);

    task.save().then(createdTask => {
        res.status(201).json({
          message: "task added successfully",
          taskId: createdTask._id
        });
      });

});
app.put('/api/tasks/:id', (req, res, next)=>{
    const task = new Task({
        _id: req.body.id,
        task_name:  req.body.task_name,
        task_description:req.body.task_description,
        assignee:req.body.assignee,
        start_date:req.body.start_date,
        due_date:req.body.due_date,
        status:req.body.status
    });
    Task.updateOne({_id: req.params.id}, post).then(result =>{
        console.log(result);
        res.status(200).json({message: "updated successfully"});
    });
});

app.delete('/api/tasks/:id', (req, res)=>{
    Task.deleteOne({_id: req.params.id}).then(result =>{
        console.log(result);
        res.status(200).json({message: "Task Delete!"});
    });
});


module.exports = app;
