const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Task = require('../../models/Task');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

//  @route   POST api/tasks
//  @desc    Create a task
//  @access  private
router.post(
'/',
[
    auth, 
    [
        check('text', '~text is required~')
        .not()
        .isEmpty()
        ]
    ],
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors:errors.array() });
    }

    try {
        const user = await User.findById(req.user.id).select('-password');
    
        const newTask = new Task ({
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        });
        const task = await newTask.save();
        res.json(task);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('~server error~')
    }
},
);

//  @route   GET api/tasks
//  @desc    get all tasks
//  @access  private

router.get('/', auth, async(req, res) =>{
    try {
        const tasks = await Task.find().sort({ date: -1 });
        res.json(tasks);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('~server error~');
    }
});

//  @route   GET api/tasks/:id
//  @desc    get task by id
//  @access  private

router.get('/:id', auth, async(req, res) =>{
    try {
        const task = await Task.findById(req.params.id);

        if(!task){
            return res.status(404).json({ msg: '~task not found~'})
        }

        res.json(task);
    } catch (err) {
        console.error(err.message);
        if(err.kind === 'ObjectId'){
            return res.status(404).json({ msg: '~task not found~'})
        }
        res.status(500).send('~server error~');
    }
});

//  @route   DELETE api/tasks/:id
//  @desc    delete a task
//  @access  private

router.delete('/:id', auth, async(req, res) =>{
    try {
        const task = await Task.findById(req.params.id);

        if(!task){
            return res.status(404).json({ msg: '~task not found~'})
        }

        // check user
        if(task.user.toString() !== req.user.id){
            return res.status(404).json({ msg: '~user not authorized~' })
        }

        await task.remove();

        res.json({ msg: '~task removed~'});
    } catch (err) {
        console.error(err.message);
        if(err.kind === 'ObjectId'){
            return res.status(404).json({ msg: '~task not found~'})
        }
        res.status(500).send('~server error~');
    }
});

//  @route   PUT api/tasks/reminder/:id
//  @desc    add a reminder to your task
//  @access  private
router.get('/reminder/:id', auth, async(req, res)=>{
try {
    const task = await Task.findById(req.params.id);

    // check if your task already has a reminder
    if(task.reminders.filter(reminder => reminder.user.toString() === req.user.id).length > 0){
        return res.json(400).json({msg: '~your task already has a reminder~'});
    }
    task.reminders.unshift({user: req.user.id});

    await task.save();

    res.json(task.reminders)

} catch (err) {
    console.error(err.message);
    res.status(500).send('~server error~');
}
})

module.exports = router;
