
require('should');

var fs = require('fs');

var Watcher = require('../');

describe('slogger', function() {
  describe('file watcher', function() {
    var watcher = new Watcher(__dirname + '/assets/access.log');

    it('is an instance of Watcher', function() {
      watcher.should.be.instanceof(Watcher);
    });

    it('emits data on change', function(done) {
      watcher.on('data', function(data) {
        data.should.equal('blah\n');
        done();
      });

      var file = fs.createWriteStream(__dirname + '/assets/access.log', {'flags': 'a'});
      file.end('blah\n', 'utf8');
    });

    it('should error with Invalid watchable', function() {
      try {
        var watcher = new Watcher();
      } catch(e) {
        e.message.should.equal('Invalid watchable');
      }
    });

    it('should be able to unwatch', function() {
      watcher.unwatch();
      watcher.listeners('data').length.should.equal(0);
    });

    // @TODO make sure it chandle overwritting the file
    // @TODO improve permission issue handling
  });  
});