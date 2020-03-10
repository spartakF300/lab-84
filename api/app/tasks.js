const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Task = require('../model/Task');

router.get('/', auth, async (req, res) => {
    try {
        const taskData = await Task.find({user: req.user._id});
        res.send(taskData)
    } catch (error) {
        res.status(500).send({error: error})
    }
});

router.post('/', auth, async (req, res) => {
    const taskData = req.body;
    try {
        const task = new Task(taskData);
        task.status = 'new';
        task.user = req.user._id;
        await task.save();
        res.send(task)
    } catch (e) {
        res.status(404).send(e);
    }
});
router.put('/:id', auth, async (req, res) => {
    if (req.body.user) {
        req.body.user = req.user._id
    }
    const tasks = await Task.findOne({id: req.params.id});

   if (tasks.user.toString() !== req.user._id.toString()){
       return res.status(404).send('not found!')
   }

    try {
        const task = await Task.updateOne({_id: req.params.id}, {$set: req.body});
        return res.send(task)
    } catch (error) {
        return res.status(400).send(error)
    }

});
router.delete('/:id', auth, async (req, res) => {
    const tasks = await Task.findOne({_id: req.params.id});

    if (tasks.user.toString() !== req.user._id.toString()) {
        return res.status(404).send('not found!')
    }

    try {
        await Task.findByIdAndDelete({_id: req.params.id});
        return res.send({message: 'Task successfully deleted'})
    } catch (error) {
        return res.status(400).send(error)
    }
});

module.exports = router;