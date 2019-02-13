const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  text: { type: String, required: true, max: [512, 'Too long, max is 512 characters']},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  thread: { type: Schema.Types.ObjectId, ref: 'Thread' },
  user: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Post', postSchema);
