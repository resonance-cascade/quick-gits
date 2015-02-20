/*eslint-disable consistent-this */
var cp = require('child_process')
var path = require('path')
var mkdirp = require('mkdirp')

var gitBin = 'git'

function git (workpath) {
  var self

  var fullwp = path.resolve(workpath)
  var exec = [gitBin, '-C ' + fullwp].join(' ')
  var execFile = ['-C', fullwp]

  function clone (remote, cb) {
    mkdirp(path.dirname(fullwp), function(err) {
      if (err) return cb(err)
      cp.execFile(gitBin, ['clone', remote, fullwp], cb)
    })
  }

  function init (cb) {
    mkdirp(fullwp, function(err) {
      if (err) return cb(err)
      cp.execFile(gitBin, ['init', fullwp], cb)
    })
  }

  function gitRun (commands) /*[[, options], callback] */ {
    var args = arguments
    switch (commands.constructor) {

      case String:

        args[0] = [exec, commands].join(' ')
        cp.exec(args[0], args[1], args[2])

      break

      case Array:

        args[0] = execFile.concat(commands)

        if (args.length === 2) { // TODO Eliminate this if else
          cp.execFile(gitBin, args[0], args[1])
        } else {
          cp.execFile(gitBin, args[0], args[1], args[2])
        }
      break
    }
  }

  self = gitRun
  self.init = init
  self.clone = clone

  return self
}

module.exports = git
/*eslint-enable consistent-this */
