const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');

const config = require("./config");
const tasks = require('./app/tasks');
const users = require('./app/users');


app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const run = async () => {
    await mongoose.connect('mongodb://localhost/toDoList', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex:true
    });

    app.use('/tasks', tasks);
    app.use('/users', users);


    app.listen(config.port, () => {
        console.log(`HTTP Server started on ${config.port} port!`);
    })
};
run().catch(e => {
    console.error(e)
});