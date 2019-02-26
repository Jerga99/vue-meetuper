exports.getMeetups = function(req, res) {
  const {category} = req.query || {};
  const {location} = req.query || {}

  const findQuery = location ? Meetup.find({ processedLocation: { $regex: '.*' + location + '.*' } })
                             : Meetup.find({})
  findQuery
        .populate('category')
        .populate('joinedPeople')
        .limit(5)
        .sort({'createdAt': -1})
        .exec((errors, meetups) => {
    if (errors) {
      return res.status(422).send({errors});
    }

    // WARNING: requires improvement, can decrease performance
    if (category) {
      meetups = meetups.filter(meetup => {
        return meetup.category.name === category
      })
    }

    return res.json(meetups);
  });
}
