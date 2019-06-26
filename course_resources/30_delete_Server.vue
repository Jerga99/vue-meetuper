


router.delete('/:id', AuthCtrl.onlyAuthUser, MeetupsCtrl.deleteMeetup)

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
      console.log(errors)
      if (errors) {
        return res.status(422).send({errors})
      }

      return res.json(meetup._id);
    })
  })
}


const Thread = require('./threads');
const User = require('./users');

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

const Post = require('./posts');

threadSchema.post('remove', removePosts);

async function removePosts(doc, next) {
  try {
    await Post.remove({_id: { $in: doc.posts }})
    return next()
  } catch (e) {
    next(e)
  }
}



