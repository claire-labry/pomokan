const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  text: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  avatar: {
    type: String,
  },
  reminders:[
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'users'
        },
    }
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
      text: {
        type: String,
        required: true,
      },
      name: {
        type: String,
      },
      avatar: {
        type: String,
      },
      date:{
          type: Date,
          default: Date.now
      }
    },
  ],
  date:{
    type: Date,
    default: Date.now
}
});

module.exports = Task = mongoose.model('task', TaskSchema)