
[![Build Status](https://secure.travis-ci.org/ryanrolds/filenotify.png)](http://travis-ci.org/ryanrolds/filenotify)

# FileNotify #

Watchs a file and emits a 'data' event when new data/lines is saved to the watched file

## Install ##

    npm install filenotify

## Usage ##

    var FileNotify = require('filenotify');
    var watcher = new FileNotify('/path/to/file');

    watcher.on('data', function(data) {
      // data is the new line(s)
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