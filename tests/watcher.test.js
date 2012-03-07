var fs = require('fs');

var Watcher = require('../');

var filePath = __dirname + '/assets/access.log';

var _writeSomething = function(text, callback) {
  fs.open(filePath, 'a', function(err, fd) {
    if(err) {
      throw err;
    }

    var buffer = new Buffer(text.length);
    buffer.write(text);

    fs.write(fd, buffer, 0, buffer.length, null, function(error, bytes, buffer) {
      fs.close(fd, callback);
    });
  });
}

describe('file watcher', function() {
  var watcher = new Watcher(filePath);

  it('is an instance of Watcher', function() {
    watcher.should.be.instanceof(Watcher);
  });

  it('emits changes on change', function(done) {
    watcher.once('data', function(data) {
      data.should.equal('blah\n');
      done();
    });

    _writeSomething('blah\n');
  });

  it('should be able to pause', function(done) {
    watcher.pause();

    var received = [];
    var listener = function(data) {
      received.push(data);
    };

    watcher.on('data', listener);

    this.timeout(3000);
    setTimeout(function() {
      watcher.removeListener('data', listener);
      received.length.should.equal(0);
      done();
    }, 500);

    _writeSomething('foo\n');
    _writeSomething('bar\n');
    _writeSomething('baz\n');
  });

  it('should be able to resume', function(done) {
    var received = [];
    watcher.on('data', function(data) {
      received.push(data);
    });

    this.timeout(3000);
    setTimeout(function() {
      received.join('').should.equal('foo\nbar\nbaz\n');

      done();
    }, 500);

    watcher.resume();
  });

  it('should be able to destroy (long)', function(done) {
    watcher.destroy();

    var listener = function() {
      throw new Error('we shouldnt hit this');
    };

    watcher.once('data', listener);

    this.timeout(3000);
    setTimeout(function() {
      watcher.removeListener('data', listener);
      done();
    }, 500);

    _writeSomething('blah\n');
  });

  it('should be able to start', function(done) {
    watcher.start();

    var listener = function(data) {
      data.should.equal('fozrick\n');
      done();
    };

    watcher.once('data', listener);

    _writeSomething('fozrick\n');
  });

  it('should be able to destroySoon (long)', function(done) {
    watcher.pause();

    watcher.on('data', function(data) {
      data.should.equal('tolo\n');
      done();
    });

    _writeSomething('tolo\n', function() {
      setTimeout(function() {
        watcher.destroySoon();
      }, 1000);
    });    
  });  

  it('should error with Invalid watchable', function() {
    try {
      var watcher = new Watcher();
    } catch(e) {
      e.message.should.equal('Invalid watchable');
    }
  });

  // @TODO make sure it chandle overwritting the file
  // @TODO improve permission issue handling
});