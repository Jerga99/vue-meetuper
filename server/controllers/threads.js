const Thread = require('../models/threads');

exports.getThreads = function(req, res) {
  const meetupId = req.query.meetupId;

  Thread.find({})
        .where({'meetup': meetupId})
        .populate({
          path: 'posts',
          options: { limit: 5, sort: {'createdAt': -1}},
          populate: {path: 'user'}
        })
        .exec((errors, threads) => {

    if (errors) {
      return res.status(422).send({errors});
    }

    return res.json(threads);
  });
}

exports.createThread = function (req, res) {
  const threadData = req.body
  const thread = new Thread(threadData)
  thread.user = req.user

  thread.save((errors, createdThread) => {
    if (errors) {
      return res.status(422).send({errors});
    }

    return res.json(createdThread)
  });
}





