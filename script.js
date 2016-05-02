var cr = require('./src/GS1Reader');

var code = '010405306372385621U16Y1PWM84SK7VSC';

var myReader = new cr.GS1Reader(code);

console.log(myReader.getApplicationIdentifiers());