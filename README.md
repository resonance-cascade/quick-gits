quick-git
=========

[![Build Status](https://travis-ci.org/bcomnes/quick-git.svg)](https://travis-ci.org/bcomnes/quick-git)
[![Code Climate](https://codeclimate.com/github/bcomnes/quick-git/badges/gpa.svg)](https://codeclimate.com/github/bcomnes/quick-git)
[![Test Coverage](https://codeclimate.com/github/bcomnes/quick-git/badges/coverage.svg)](https://codeclimate.com/github/bcomnes/quick-git)

Provides quick access to git commands using child_process.  Works with Node.

## Example

```js
var qGit = require('quick-git');
var path = require('path');

var repoAPath = path.join(__dirname,'repoA')
var repoBPath = path.join(__dirname,'repoB')

var repoA = qGit(repoAPath);
var repoB = qGit(repoBPath);

repoA.init(function(err, stdout, stderr) {
  console.log('Initialized new repository at ' + repoAPath)
});

repoB.clone(repoAPath, function(err, stdout, stderr) {
  console.log('Cloned ' + repoAPath +' to ' + repoBPath)
})

repoA.('status', function(err, stdout, stderr) {
  console.log('Ran `git status` in repoA')
})

repoB(['fetch','origin'], function(err, stdout, stderr) {
    console.log(stdout);
})
```
