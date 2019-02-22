const Meetup = require('../models/meetups');
const User = require('../models/users');

exports.getSecret = function (req, res) {
  return res.json({secret: 'I am secret Message'})
}

exports.getMeetups = function(req, res) {
  Meetup.find({})
        .populate('category')
        .populate('joinedPeople')
        .exec((errors, meetups) => {

    if (errors) {
      return res.status(422).send({errors});
    }

    return res.json(meetups);
  });
}

exports.getMeetupById = function(req, res) {
  const {id} = req.params;

  Meetup.findById(id)
        .populate('meetupCreator', 'name id avatar')
        .populate('category')
        .populate({path: 'joinedPeople',
           options: {limit: 5, sort: {username: -1}}})
        .exec((errors, meetup) => {
    if (errors) {
      return res.status(422).send({errors});
    }

    return res.json(meetup);
  });
}

exports.createMeetup = function(req, res) {
  const meetupData = req.body;
  const user = req.user;

  const meetup = new Meetup(meetupData);
  meetup.user = user;
  meetup.status = 'active';

  meetup.save((errors, createdMeetup) => {
    if (errors) {
      return res.status(422).send({errors});
    }

    return res.json(createdMeetup)
  })
}

exports.joinMeetup = function (req, res) {
  const user = req.user;
  const {id} = req.params;

  Meetup.findById(id, (errors, meetup) => {
    if (errors) {
      return res.status(422).send({errors})
    }

    meetup.joinedPeople.push(user);
    meetup.joinedPeopleCount++;

    return Promise.all(
      [meetup.save(),
      User.updateOne({ _id: user.id }, { $push: { joinedMeetups: meetup }})])
      .then(result => res.json({id}))
      .catch(errors => res.status(422).send({errors}))
  })
}

exports.leaveMeetup = function (req, res) {
  const user = req.user;
  const {id} = req.params;

  Promise.all(
    [Meetup.updateOne({ _id: id }, { $pull: { joinedPeople: user.id }, $inc: {joinedPeopleCount: -1}}),
     User.updateOne({ _id: user.id }, { $pull: { joinedMeetups: id }})])
    .then(result => res.json({id}))
    .catch(errors => res.status(422).send({errors}))
}













