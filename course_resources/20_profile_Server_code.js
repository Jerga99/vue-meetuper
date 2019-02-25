const Meetup = require('../models/meetups');
const Thread = require('../models/threads');
const Post = require('../models/posts');
const Category = require('../models/categories');

// @facet
// Processes multiple aggregation pipelines within a single stage on the same set of input documents.
// Each sub-pipeline has its own field in the output document where its results are stored as an array of documents.


// meetups: find all of the meetups where meetupCreator is loggedIn user
//          find only 5 meetups
//          sort meetups by newest ones

// meetupsCount: find all of the meetups where meetupCreator is loggedIn user
//               don't return data but count of all meetups

function fetchMeetupsByUserQuery (userId) {
  return Meetup.aggregate([
    { "$facet": {
      "meetups": [
        { "$match": {"meetupCreator": userId}},
        { "$limit": 5 },
        { "$sort": {"createdAt": -1} }
      ],
      "meetupsCount": [
        { "$match": {"meetupCreator": userId}},
        { "$count": "count" }
      ]
    }}
  ])
  .exec()
  .then(results => {
    return new Promise((resolve, reject) => {
      Category.populate(results[0].meetups, {path: 'category'})
      .then(pMeetups => {
        if (pMeetups && pMeetups.length > 0) {
          resolve({data: pMeetups, count: results[0].meetupsCount[0].count});
        } else {
          resolve({data: results[0].meetups, count: 0})
        }
      })
    })
  })
}

function fetchThreadsByUserQuery (userId) {
  return Thread.aggregate([
      { "$facet": {
        "threads": [
          { "$match": {"user": userId}},
          { "$limit": 5 },
          { "$sort": {"createdAt": -1} }
        ],
        "threadsCount": [
          { "$match": {"user": userId}},
          { "$count": "count" }
        ]
      }}
    ])
  .exec()
  .then(results => {
    const threads = results[0].threads;
    if (threads && threads.length > 0) {
      return {data: threads, count: results[0].threadsCount[0].count}
    }

    return {data: threads, count: 0}
  })
}

function fetchPostByUserQuery (userId) {
  return Post.aggregate([
      { "$facet": {
        "posts": [
          { "$match": {"user": userId}},
          { "$limit": 5 },
          { "$sort": {"createdAt": -1} }
        ],
        "postsCount": [
          { "$match": {"user": userId}},
          { "$count": "count" }
        ]
      }}
    ])
  .exec()
  .then(results => {
    const posts = results[0].posts;
    if (posts && posts.length > 0) {
      return {data: results[0].posts, count: results[0].postsCount[0].count}
    }

    return {data: results[0].posts, count: 0}
   }
)}

exports.getUserActivity = function (req, res) {
  const userId = req.user._id;

  Promise.all(
    [fetchMeetupsByUserQuery(userId),
     fetchThreadsByUserQuery(userId),
     fetchPostByUserQuery(userId)
    ])
    // Writing [] to get data from the array
    .then(([meetups, threads, posts]) => res.json({meetups, threads, posts}))
    .catch(err => {
      console.log(err)
      res.status(422).send({err})
      })
}

exports.updateUser = (req, res) => {
  const userId = req.params.id;
  const userData = req.body;
  const user = req.user;

  if (user.id === userId) {
    // new: bool - true to return the modified document rather than the original. defaults to false
    User.findByIdAndUpdate(userId, { $set: userData}, { new: true }, (errors, updatedUser) => {
      if (errors) return res.status(422).send({errors});
      return res.json(updatedUser);
    });
  } else {
    return res.status(422).send({errors: 'Authorization Error!'})
  }
}



// Routes
router.get('/me/activity', AuthCtrl.onlyAuthUser, UsersCtrl.getUserActivity);
router.patch('/:id', AuthCtrl.onlyAuthUser, UsersCtrl.updateUser);


