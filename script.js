var cr = require('./src/GS1Reader');

// Without GS
// var code = '010405306372385621U16Y1PWM84SK7VSC';

// With GS
var code = '0109120049640041171812311050532212KP1NDMXA2BP9P6C';

var myReader = new cr.GS1Reader(code);

console.log(myReader.getApplicationIdentifiers());