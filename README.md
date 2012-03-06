
# File Changes #

Watchs a file and emits 'change' event with new data/lines in the watched file

## Install ##

    npm install filechanges

## Usage ##

    var FileChanges = require('filechanges');
    var watcher = new FileChanges('/path/to/file');

    watcher.on('change', function(error, theChange) {
      // theChange is the new line(s)
    });

    // When done unwatch
    watcher.unwatch();
    