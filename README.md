
[![Build Status](https://secure.travis-ci.org/ryanrolds/filenotify.png)](http://travis-ci.org/ryanrolds/filenotify)

# File Changes #

Watchs a file and emits a 'data' event when new data/lines is saved to the watched file

## Install ##

    npm install filechanges

## Usage ##

    var FileNotify = require('filechanges');
    var watcher = new FileNotify('/path/to/file');

    watcher.on('data', function(error, theChange) {
      // theChange is the new line(s)
    });

    // Pause events
    watcher.pause();

    // Resume events (after pause)
    watcher.resume();
    
    // Stop
    watcher.destroy();

    // Start (after destroy)
    watcher.start();

    // Destroy after empting paused queue
    watcher.destroySoon();