exports.createPost = function(req, res) {
  const postData = req.body
  const post = new Post(postData)
  post.user = req.user

  post.save((errors, createdPost) => {
    if (errors) {
      return res.status(422).send({errors});
    }

    Thread.update({ _id: createdPost.thread }, { $push: { posts: createdPost }}, () => {})
    return res.json(createdPost)
  });
}

router.post('', AuthCtrl.onlyAuthUser, PostsCtrl.createPost);
