exports.joinMeetup = function (req, res) {
  const user = req.user;
  const {id} = req.params;

  Meetup.findById(id, (err, meetup) => {
    meetup.joinedPeople.push(user);
    meetup.joinedPeopleCount++;

    return Promise.all(
      [meetup.save(),
      User.updateOne({ _id: user.id }, { $push: { joinedMeetups: meetup }})])
      .then(result => res.json({id}))
      .catch(err => res.status(422).send(err))
  })
}

exports.leaveMeetup = function (req, res) {
  const user = req.user;
  const {id} = req.params;

  Promise.all(
    [Meetup.updateOne({ _id: id }, { $pull: { joinedPeople: user.id }, $inc: {joinedPeopleCount: -1}}),
     User.updateOne({ _id: user.id }, { $pull: { joinedMeetups: id }})])
    .then(result => res.json({id}))
    .catch(err => res.status(422).send(err))
}




router.post('/:id/join', AuthCtrl.onlyAuthUser, MeetupsCtrl.joinMeetup);
router.post('/:id/leave', AuthCtrl.onlyAuthUser, MeetupsCtrl.leaveMeetup);
