



exports.getMeetups = function(req, res) {
  const {category, location} = req.query;

  // Page Setup
  const pageSize = parseInt(req.query.pageSize) || 6;
  const pageNum = parseInt(req.query.pageNum) || 1;
  const skips = pageSize * (pageNum - 1)

  const findQuery = location ? Meetup.find({ processedLocation: { $regex: '.*' + location + '.*' } })
                             : Meetup.find({})

  findQuery
        .populate('category')
        .populate('joinedPeople')
        .limit(6)
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





const meetup7Id = mongoose.Types.ObjectId();
const meetup8Id = mongoose.Types.ObjectId();
const meetup9Id = mongoose.Types.ObjectId();
const meetup10Id = mongoose.Types.ObjectId();
const meetup11Id = mongoose.Types.ObjectId();
const meetup12Id = mongoose.Types.ObjectId();


{
      "_id": meetup7Id,
      "location": "London, UK",
      "processedLocation": "londonuk",
      "title": "Someting in the city",
      "image": "https://images.unsplash.com/photo-1527956041665-d7a1b380c460?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
      "description": "Lets watch new spiderman together",
      "shortInfo": "Just some short info, I don't kow just be yourself.",
      "createdAt": moment().toISOString(),
      "updatedAt": moment().toISOString(),
      "startDate": moment().add(7, 'days').toISOString(),
      "timeFrom": "08:00",
      "timeTo": "10:00",
      "joinedPeopleCount": 2,
      "status": "active",
      "category": category3Id,
      "joinedPeople": [],
      "meetupCreator": user2Id
    },
    {
      "_id": meetup8Id,
      "location": "London, UK",
      "processedLocation": "londonuk",
      "title": "Someting else in the city",
      "image": "https://images.unsplash.com/photo-1527956041665-d7a1b380c460?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
      "description": "Hmmmm some nice description",
      "shortInfo": "Nananananaanan",
      "createdAt": moment().toISOString(),
      "updatedAt": moment().toISOString(),
      "startDate": moment().add(7, 'days').toISOString(),
      "timeFrom": "08:00",
      "timeTo": "10:00",
      "joinedPeopleCount": 2,
      "status": "active",
      "category": category3Id,
      "joinedPeople": [],
      "meetupCreator": user2Id
    },
    {
      "_id": meetup9Id,
      "location": "London, UK",
      "processedLocation": "londonuk",
      "title": "Someting else in the city",
      "image": "https://images.unsplash.com/photo-1527956041665-d7a1b380c460?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
      "description": "Do somerhing together",
      "shortInfo": "Just some short info, I don't kow just be yourself.",
      "createdAt": moment().toISOString(),
      "updatedAt": moment().toISOString(),
      "startDate": moment().add(7, 'days').toISOString(),
      "timeFrom": "08:00",
      "timeTo": "10:00",
      "joinedPeopleCount": 2,
      "status": "active",
      "category": category3Id,
      "joinedPeople": [],
      "meetupCreator": user2Id
    },
    {
      "_id": meetup10Id,
      "location": "London, UK",
      "processedLocation": "londonuk",
      "title": "Someting in the city",
      "image": "https://images.unsplash.com/photo-1527956041665-d7a1b380c460?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
      "description": "Lets watch new spiderman together",
      "shortInfo": "Just some short info, I don't kow just be yourself.",
      "createdAt": moment().toISOString(),
      "updatedAt": moment().toISOString(),
      "startDate": moment().add(7, 'days').toISOString(),
      "timeFrom": "08:00",
      "timeTo": "10:00",
      "joinedPeopleCount": 2,
      "status": "active",
      "category": category3Id,
      "joinedPeople": [],
      "meetupCreator": user2Id
    },
    {
      "_id": meetup11Id,
      "location": "London, UK",
      "processedLocation": "londonuk",
      "title": "Someting in the city",
      "image": "https://images.unsplash.com/photo-1527956041665-d7a1b380c460?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
      "description": "Lets watch new spiderman together",
      "shortInfo": "Just some short info, I don't kow just be yourself.",
      "createdAt": moment().toISOString(),
      "updatedAt": moment().toISOString(),
      "startDate": moment().add(7, 'days').toISOString(),
      "timeFrom": "08:00",
      "timeTo": "10:00",
      "joinedPeopleCount": 2,
      "status": "active",
      "category": category3Id,
      "joinedPeople": [],
      "meetupCreator": user2Id
    },
    {
      "_id": meetup12Id,
      "location": "London, UK",
      "processedLocation": "londonuk",
      "title": "Someting good in the city",
      "image": "https://images.unsplash.com/photo-1527956041665-d7a1b380c460?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
      "description": "Lets watch new spiderman together",
      "shortInfo": "Just some short info, I don't kow just be yourself.",
      "createdAt": moment().toISOString(),
      "updatedAt": moment().toISOString(),
      "startDate": moment().add(7, 'days').toISOString(),
      "timeFrom": "08:00",
      "timeTo": "10:00",
      "joinedPeopleCount": 2,
      "status": "active",
      "category": category3Id,
      "joinedPeople": [],
      "meetupCreator": user2Id
    }
