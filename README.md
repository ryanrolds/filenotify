
# File Changes #

Watchs a file and emits 'data' events containging new data/lines in file

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
    