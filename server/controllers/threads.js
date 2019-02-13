const Thread = require('../models/threads');

exports.getThreads = function(req, res) {
  const meetupId = req.query.meetupId;

  Thread.find({})
        .where({'meetup': meetupId})
        .populate({
          path: 'posts',
          populate: {path: 'user'}
        })
        .exec((errors, threads) => {

    if (errors) {
      return res.status(422).send({errors)});
    }

    return res.json(threads);
  });
}
