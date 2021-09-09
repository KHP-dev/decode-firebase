var fs = require('fs');

module.exports = function checkAdd() {
    var ok = fs.readFileSync('./address.txt', { encoding: 'utf8' });
    ok = ok.split('\n');
    var dem = ok.length;
    return dem;
  }