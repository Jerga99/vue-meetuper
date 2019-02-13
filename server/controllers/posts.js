const Thread = require('../models/threads');

exports.getPosts = function(req, res) {
  const threadId = req.query.threadId;

  Post.find({'thread': threadId})
        .populate('user')
        .exec((errors, posts) => {

    if (errors) {
      return res.status(422).send({errors});
    }

    return res.json(posts);
  });
}
