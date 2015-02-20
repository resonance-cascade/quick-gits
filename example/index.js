var qGit = require('../')
var path = require('path')

var repoAPath = path.join(__dirname, 'repoA')
var repoBPath = path.join(__dirname, 'repoB')

var repoA = qGit(repoAPath)
var repoB = qGit(repoBPath)

repoA.init(function(err, stdout, stderr) {
  if (err) throw (err)
  console.log('Initialized new repository at ' + repoAPath)

  repoB.clone(repoAPath, function(err, stdout, stderr) {
    if (err) throw (err)
    console.log('Cloned ' + repoAPath + ' to ' + repoBPath)

    repoA('status', function(err, stdout, stderr) {
      if (err) throw (err)
      console.log('Ran `git status` in repoA:')
      console.log(stdout)
    })

    repoB(['pull', 'origin'], function(err, stdout, stderr) {
      if (err) throw (err)
      console.log('repoB pulled repo A')
      console.log(stdout)
    })
  })
})
