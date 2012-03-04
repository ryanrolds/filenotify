
var events = require('events');
var util = require('util');
var fs = require('fs');

module.exports = function() {
  var FileChanges = function FileChanges(watchable) {
    this.watchable = watchable;
    // If string treat as file, else check if readable stream
    if(typeof watchable === 'string') {
      //events.EventEmitter.call(this);
      var caller = this;
      fs.watchFile(watchable, {'persistent': true}, function(curr, prev) {
        if(prev.isFile() && curr.mtime !== prev.mtime) {
          var size = curr.size - prev.size;
          var buffer = new Buffer(size);

          fs.open(watchable, 'r', function(error, fd) {
            fs.read(fd, buffer, 0, size, prev.size, function(error, bytes, buff) {
              caller.emit('data', buff.toString());
            });
          });
        }
      });
    } else {
      throw new Error('Invalid watchable');
    }
  };

  util.inherits(FileChanges, events.EventEmitter);

  FileChanges.prototype.unwatch = function() {
    fs.unwatchFile(this.watchable);
    this.removeAllListeners();
  };

  return FileChanges;
}();