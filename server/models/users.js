const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Meetup = require('./meetups');

const userSchema = new Schema({
  avatar: String,
  email: { type: String,
           required: 'Email is Required',
           lowercase: true,
           unique: true,
           match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]},
  name: { type: String,
          required: true,
          min: [6, 'Too short, min is 6 characters']},
  username: { type: String,
          required: true,
          min: [6, 'Too short, min is 6 characters']},
  password: {
    type: String,
    min: [4, 'Too short, min is 4 characters'],
    max: [32, 'Too long, max is 32 characters'],
    required: 'Password is required'
  },
  info: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  joinedMeetups: [{ type: Schema.Types.ObjectId, ref: 'Meetup' }]
});

module.exports = mongoose.model('User', userSchema );

// Change it to be ASYNC!
userSchema.pre('save', function(next) {
  const user = this;

  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
        user.password = hash;
        next();
    });
  });
});
