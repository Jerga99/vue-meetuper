

exports.createThread = function (req, res) {
  const threadData = req.body
  const thread = new Thread(threadData)
  thread.user = req.user

  thread.save((err, createdThread) => {
    if (err) {
      return res.status(422).send({err});
    }

    return res.json(createdThread)
  });
}

router.post('', AuthCtrl.onlyAuthUser, ThreadsCtrl.createThread)
