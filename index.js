
var events = require('events');
var util = require('util');
var fs = require('fs');

module.exports = function() {
  var FileNotify = function FileNotify(watchable) {
    this.watchable = watchable;

    // If string treat as file, else check if readable stream
    if(typeof watchable === 'string') {
      this.start();
    } else {
      throw new Error('Invalid watchable');
    }
  };

  util.inherits(FileNotify, events.EventEmitter);

  FileNotify.prototype.start = function() {
    this.paused = false;

    var caller = this;
    fs.watchFile(this.watchable, {'persistent': true}, function(curr, prev) {
      if(prev.isFile() && curr.mtime !== prev.mtime) {
        var size = curr.size - prev.size;
        var buffer = new Buffer(size);

        fs.open(caller.watchable, 'r', function(error, fd) {
          fs.read(fd, buffer, 0, size, prev.size, function(error, bytes, buff) {
            if(!caller.paused) {
              _emitData.call(caller, buff);
            } else {
              caller.paused.push(buff.toString());
            }
          });
        });
      }
    });
  };

  var _emitData = function(buff) {
    this.emit('data', buff.toString());
  };

  var _empty = function() {
    var caller = this;
    this.paused.forEach(function(buffer) {
      _emitData.call(caller, buffer);
    });
  };

  FileNotify.prototype.resume = function() {
    // Send all stored notifications
    _empty.call(this);
    this.paused = false;
  };

  FileNotify.prototype.pause = function() {
    if(!this.paused) {
      this.paused = [];
    }
  };

  FileNotify.prototype.destroy = function() {
    fs.unwatchFile(this.watchable);
    this.paused = false;
  };

  FileNotify.prototype.destroySoon = function() {
    _empty.call(this);
    this.destroy();
  };

  return FileNotify;
}();