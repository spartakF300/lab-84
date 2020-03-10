const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description:String,
    status: {
        type: String,
        required: true,
        enum: ['new', 'in_progress', 'complete']

    }



});
const Task = mongoose.model('Task', TaskSchema);
module.exports = Task;