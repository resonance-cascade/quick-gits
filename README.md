quick-gits
=========

[![npm version](https://badge.fury.io/js/quick-gits.svg)](https://www.npmjs.com/package/quick-gits)
[![Build Status](https://travis-ci.org/bcomnes/quick-gits.svg)](https://travis-ci.org/bcomnes/quick-gits)
[![Code Climate](https://codeclimate.com/github/bcomnes/quick-gits/badges/gpa.svg)](https://codeclimate.com/github/bcomnes/quick-gits)
[![Test Coverage](https://codeclimate.com/github/bcomnes/quick-gits/badges/coverage.svg)](https://codeclimate.com/github/bcomnes/quick-gits)

Provides quick access to git commands using child_process.  Works with Node.

## Example

```js
var gits = require('quick-gits');
var path = require('path');

var repoAPath = path.join(__dirname, 'repoA')
var repoBPath = path.join(__dirname, 'repoB')

var repoA = gits(repoAPath);
var repoB = gits(repoBPath);

repoA.init(function(err, stdout, stderr) {

  console.log('Initialized new repository at ' + repoAPath)

  repoB.clone(repoAPath, function(err, stdout, stderr) {

    console.log('Cloned ' + repoAPath + ' to ' + repoBPath)

    repoA('status', function(err, stdout, stderr) {
      console.log('Ran `git status` in repoA:')
      console.log(stdout);
    });

    repoB(['pull', 'origin'], function(err, stdout, stderr) {
      console.log('repoB pulled repo A')
      console.log(stdout);
    });
  });
});

```

```
Initialized new repository at quick-gits/example/repoA
Cloned quick-gits/example/repoA to quick-gits/example/repoB
Ran `git status` in repoA:
On branch master

Initial commit

nothing to commit (create/copy files and use "git add" to track)

repoB pulled repo A
```

## Methods

`quick-gits` is a convience wrapper around the `child_process` module when you need to automate and call git many times in a program, or assemble more complicated git workflow.


### `var git =  require('quick-gits')(path)`

Returns a `quick-gits` function that is bound the `path` it is called with and is assigned to the example `git` object.  Assign `require('quick-gits')` to a variable create a repository object factory.  It follows the Functional Inheritance pattern and does not requires the `new` keyword.

### `git(command, [options], [callback])`

`git` is a function that normalizes the input similar to the [`child_process.exec`](http://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback) and [`child_process.execFile`](http://nodejs.org/api/child_process.html#child_process_child_process_execfile_file_args_options_callback) methods, except `git` is the command or file being run with arguments provided by the `command` argument and the `-C` git flag set to the creation `path`.



### `git.clone(remote, cb)`



### `git.init(cb)`

