// Create Meetup
exports.createMeetup = function(req, res) {
  const meetupData = req.body;
  const user = req.user;

  const meetup = new Meetup(meetupData);
  meetup.user = user;
  meetup.status = 'active';

  meetup.save((err, createdMeetup) => {
    if (errors) {
      return res.status(422).send({errors});
    }

    return res.json(createdMeetup)
  })
}


// Post Route
router.post('', AuthCtrl.onlyAuthUser, MeetupsCtrl.createMeetup);
