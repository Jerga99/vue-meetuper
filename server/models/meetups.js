const Thread = require('./threads');
const User = require('./users');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const meetupSchema = new Schema({
  location: { type: String, required: true },
  processedLocation: String,
  title: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  shortInfo: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  startDate: { type: Date, required: true },
  timeFrom: { type: String, required: true },
  timeTo: { type: String, required: true },
  status: String,
  joinedPeopleCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  meetupCreator: { type: Schema.Types.ObjectId, ref: 'User' },
  joinedPeople: [{type: Schema.Types.ObjectId, ref: 'User'}]
});

meetupSchema.post('remove', removeThreads);

async function removeThreads(meetup, next) {
  try {
    await Thread.find({meetup: { $in: meetup._id}}, function (errors, threads) {
    if (errors) {
      return next(errors);
    }

    return Promise.all(threads.map(t => t.remove()))
  })
    await User.updateMany({ _id: { $in: meetup.joinedPeople}}, { $pull: { joinedMeetups: meetup._id }})
    next()
  } catch (e) {
    next(e);
  }
}

module.exports = mongoose.model('Meetup', meetupSchema );
