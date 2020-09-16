const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Task = require('../../models/Task');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

//  @route   POST api/tasks
//  @desc    Create a task
//  @access  Public
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

module.exports = router;
