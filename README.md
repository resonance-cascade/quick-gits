quick-gits
=========

DEPRECIATED!

[![npm version](https://badge.fury.io/js/quick-gits.svg)](https://www.npmjs.com/package/quick-gits)
[![Build Status](https://travis-ci.org/bcomnes/quick-gits.svg)](https://travis-ci.org/bcomnes/quick-gits)
[![Test Coverage](https://codeclimate.com/github/bcomnes/quick-gits/badges/coverage.svg)](https://codeclimate.com/github/bcomnes/quick-gits)
[![Code Climate](https://codeclimate.com/github/bcomnes/quick-gits/badges/gpa.svg)](https://codeclimate.com/github/bcomnes/quick-gits)

Provides quick access to most git commands using child_process.  Works with Node.

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

`quick-gits` is a convenience wrapper around the `child_process` module running `git` commands.  It is useful when you need to automate git workflows in a program.


### `var git =  require('quick-gits')(workpath)`

- Return: QuickGits object

Returns a `quick-gits` Object that is bound bound to `workpath`.  You can think of the returned function equivalent to running the `git` command inside of the `path` it is bound to, or running `git` from the command line with the `-C` option pointing to `path`.

Assign `require('quick-gits')` to a variable create a repository object factory.  It follows the Functional Inheritance pattern and does not requires the `new` keyword.

```js
var gits = require('quick-gits');
var path = require('path');

var repoA = gits(path.join(__dirname, 'repoA'));
var repoB = gits(path.join(__dirname, 'repoB'));
```

### `git(command, [options], [callback])`

There are two primary ways of using a returned `quick-gits` object.

- `command` String or Array of arguments to pass to `git`.
  - Accepts either a [`child_process.exec`](http://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback) or a [`child_process.execFile`](http://nodejs.org/api/child_process.html#child_process_child_process_execfile_file_args_options_callback) style command to pass to `git`.
  - `command` Array
    - Passing an Array as the command uses `child_process.execFile` to run the command.
    - `['push','origin','master']` results in `git -C $workpath push origin master`
  - `command` String
    - Passing a String as the command uses the `child_process.exec` to run the command.
    - `'push origin master'` results in `git -C $workpath push origin master`
- `options` Object
  - accepts the same options as [`child_process.exec`](http://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback) and [`child_process.execFile`](http://nodejs.org/api/child_process.html#child_process_child_process_execfile_file_args_options_callback).
  - `cwd` String Current working directory of the child process
  - `env` Object Environment key-value pairs
  - `encoding` String (Default: 'utf8')
  - `timeout` Number (Default: 0)
  - `maxBuffer` Number `(Default: 200*1024)`
  - `killSignal` String (Default: 'SIGTERM')
- `callback` Function called with the output when git terminates
  - `error` Error
  - `stdout` Buffer
  - `stderr` Buffer

### Convenience Methods

These methods are special cases where you would not want the `workpath` specified when running a git command, such as cloning and initialization of new repositories.

### `git.init(callback)`

Same as running `git init $workpath` to initialize an empty repository at `workpath`.  Relative `workpath`s are resolved to the full path through `path.resolve`, and an new directories are created recursively using [`mkdirp`](https://www.npmjs.com/package/mkdirp).

- `callback` Function called with the output when git terminates
  - `error` Error
  - `stdout` Buffer
  - `stderr` Buffer

### `git.clone(remote, cb)`

Same as running `git clone remote $workpath`.  Relative `workpath`s are resolved to the full path through `path.resolve`, and an new directories are created recursively using [`mkdirp`](https://www.npmjs.com/package/mkdirp).

- `remote` String passed as the `<repository>` to the `git` command.
- `callback` Function called with the output when git terminates
  - `error` Error
  - `stdout` Buffer
  - `stderr` Buffer

