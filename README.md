
# File Changes #

Watchs a file and emits 'data' events containging new data/lines in file

## Install ##

    npm install filechanges

## Usage ##

    var FileChanges = require('filechanges');
    var blah = new FileChanges('/path/to/file');
    blah.on('data', function(error, data) {
      // data is the new line(s)
    });

    // When done unwatch
    blah.unwatch();
    