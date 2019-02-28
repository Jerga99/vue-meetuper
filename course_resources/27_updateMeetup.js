exports.updateMeetup = function (req, res) {
  const meetupData = req.body
  const {id} = req.params
  const user = req.user;

  if (user.id === meetupData.meetupCreator._id) {
    Meetup.findByIdAndUpdate(id, { $set: meetupData}, { new: true },
    (errors, updatedMeetup) => {
      if (errors) {
        return res.status(422).send({errors})
      }

      return res.json(updatedMeetup)
    })
  } else {
    return res.status(401).send({errors: {message: 'Not Authorized!'}})
  }
}

router.patch('/:id', AuthCtrl.onlyAuthUser, MeetupsCtrl.updateMeetup)


