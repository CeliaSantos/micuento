'use strict';
const fs = require('fs');

fs.createReadStream(`./env/${process.argv[2]}.env`)
    .pipe(fs.createWriteStream('.env'));
