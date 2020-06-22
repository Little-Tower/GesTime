const express = require('express');
const router = express.Router();

const task = require('../models/task');

router.get('/', async (req, res) => {
    const tasks = await task.find();
    console.log(tasks);
    res.json(tasks);
});

router.get('/:id', async (req, res) => {
    const nLook = await task.findById(req.params.id);
    res.json(nLook);
});

router.post('/', async (req, res) => {
    const { title, description } = req.body;
    const nData = new task({title, description});
    await nData.save();
    res.json({status: 'Task saved'});
});

router.put('/:id', async (req, res) => {
    const { title, description} = req.body;
    const nTask = {title, description};
    await task.findByIdAndUpdate(req.params.id, nTask);
    res.json({status: 'Task updated'});
});

router.delete('/:id', async (req, res) => {
    await task.findByIdAndDelete(req.params.id);
    res.json({status: 'Task deleted'});
});

module.exports = router;