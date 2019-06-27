const Meetup = require('../models/meetups');
const User = require('../models/users');

exports.getSecret = function (req, res) {
  return res.json({secret: 'I am secret Message'})
}

exports.getMeetups = function(req, res) {
  const {category, location} = req.query;

  // Page Setup
  const pageSize = parseInt(req.query.pageSize) || 6;
  const pageNum = parseInt(req.query.pageNum) || 1;
  const skips = pageSize * (pageNum - 1);

  const findQuery = location ? Meetup.find({ processedLocation: { $regex: '.*' + location + '.*' } })
                             : Meetup.find({})

  findQuery
        .populate('category')
        .populate('joinedPeople')
        .skip(skips)
        .limit(pageSize)
        .sort({'createdAt': -1})
        .exec((errors, meetups) => {
    if (errors) {
      return res.status(422).send({errors});
    }

    if (category) {
      meetups = meetups.filter(meetup => {
        return meetup.category.name === category
      })
    }

    Meetup.count({})
      .then(count => {

        return res.json({meetups: meetups.splice(0, pageSize), count, pageCount: count / pageSize});
      });
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

// We were just debugging in this lecture (:
exports.updateMeetup = function (req, res) {
  const meetupData = req.body
  const {id} = req.params
  const user = req.user;
  meetupData.updatedAt = new Date()

  if (user.id === meetupData.meetupCreator._id) {
    Meetup.findByIdAndUpdate(id, { $set: meetupData}, { new: true })
          .populate('meetupCreator', 'name id avatar')
          .populate('category')
          .exec((errors, updatedMeetup) => {

      if (errors) {
        return res.status(422).send({errors})
      }

      return res.json(updatedMeetup)
    })
  } else {
    return res.status(401).send({errors: {message: 'Not Authorized!'}})
  }
}


exports.deleteMeetup = function(req, res) {
  const {id} = req.params;
  const user = req.user;

  Meetup.findById(id, (errors, meetup) => {
    if (errors) {
      return res.status(422).send({errors})
    }

    if (meetup.meetupCreator != user.id) {
      return res.status(401).send({errors: {message: 'Not Authorized!'}})
    }

    meetup.remove((errors, _) => {
      if (errors) {
        return res.status(422).send({errors})
      }

      return res.json(meetup._id);
    })
  })
}











