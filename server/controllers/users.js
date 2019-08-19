const User = require('../models/users');
const Meetup = require('../models/meetups');
const Thread = require('../models/threads');
const Post = require('../models/posts');
const Category = require('../models/categories');
const ConfirmationHash = require('../models/confirmation-hash');
const passport = require('passport');
const nodemailer = require('nodemailer');
const config = require('../config');


function sendConfirmationEmail({toUser, hash}, callback) {

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.GOOGLE_USER,
      pass: config.GOOGLE_PASSWORD
    }
  })

  const message = {
    from: config.GOOGLE_USER,
    // to: toUser.email // in production uncomment this
    to: config.GOOGLE_USER,
    subject: 'Vue Meetuper - Activate Account',
    html: `
      <h3> Hello ${toUser.name} </h3>
      <p>Thank you for registering into Vue Meetuper. Much Appreciated! Just one last step is laying ahead of you...</p>
      <p>To activate your account please follow this link: <a target="_" href="${config.DOMAIN}/users/${hash}/activate">${config.DOMAIN}/activate </a></p>
      <p>Cheers</p>
      <p>Your Vue Meetuper Team</p>
    `
  }

  transporter.sendMail(message, function(err, info) {
    if (err) {
      callback(err, null)
    } else {
      callback(null, info)
    }
  })
}

exports.activateUser = function(req, res) {
  const { hash } = req.params

  ConfirmationHash
    .findById(hash)
    .populate('user')
    .exec((errors, foundHash) => {
      if (errors) { return res.status(422).send({errors}); }

      User.findByIdAndUpdate(foundHash.user.id, { $set: {active: true}}, { new: true}, (errors, updatedUser) => {
        if (errors) { return res.status(422).send({errors}); }
        foundHash.remove(() => {})

        return res.json(updatedUser);
      })
    })
}


exports.getUsers = function(req, res) {
  User.find({})
        .exec((errors, users) => {

    if (errors) {
      return res.status(422).send({errors});
    }

    return res.json(users);
  });
}

exports.getCurrentUser = function (req, res, next) {
  const user = req.user;

  if(!user) {
    return res.sendStatus(422);
  }

  // For Session Auth!
  // return res.json(user);
  return res.json(user.toAuthJSON());
};

exports.register = function(req, res) {
  const registerData = req.body

  if (!registerData.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
        message: 'Email is required'
      }
    })
  }

  if (!registerData.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
        message: 'Password is required'
      }
    })
  }

  if (registerData.password !== registerData.passwordConfirmation) {
    return res.status(422).json({
      errors: {
        password: 'is not the same as confirmation password',
        message: 'Password is not the same as confirmation password'
      }
    })
  }

  const user = new User(registerData);

  return user.save((errors, savedUser) => {
    if (errors) { return res.status(422).json({errors}) };
    const hash = new ConfirmationHash({ user: savedUser });

    hash.save((errors, createdHash) => {
      if (errors) { return res.status(422).json({errors}) };

      sendConfirmationEmail({toUser: savedUser, hash: hash.id}, (errors, info) => {
        if (errors) { return res.status(422).json({errors}) };

        return res.json(savedUser)
      })
    })
  })
}

exports.login = function (req, res, next) {
  const { email, password } = req.body

  if (!email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
        message: 'Email is required'
      }
    })
  }

  if (!password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
        message: 'Password is required'
      }
    })
  }

  return passport.authenticate('local', (err, passportUser) => {
    if (err) {
      return next(err)
    }

    if (passportUser) {
      if (passportUser.active) {
        return res.json(passportUser.toAuthJSON())
      } else {
        return res.status(422).send({errors: {
          'message': 'Please check your email in order to activate account'
        }})
      }
    } else {
      return res.status(422).send({errors: {
        'message': 'Invalid password or email'
      }})
    }

  })(req, res, next)
}

exports.logout = function (req, res) {
  req.logout()
  return res.json({status: 'Session destroyed!'})
}

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







