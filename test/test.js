// Testing requires
var assert = require('assert');

// Content requires
var gs1reader = require('../src/GS1Reader');

describe('GS1Reader', function () {

    // GS1 data matrix code with mixed fixed-length and variable length AIs
    describe('new(\'0109120049640041171812311050532<GS>212KP1NDMXA2BP9P6C\') mixed fix/var length', function () {
        
        var code = '0109120049640041171812311050532212KP1NDMXA2BP9P6C';
        var myReader = new gs1reader.GS1Reader(code);
        var AIs = myReader.getApplicationIdentifiers();  
              
        it('should return 4 AIs', function () {
            assert.equal(4, AIs.length);
        });
        it('should return AI "01" at position 0 with value "09120049640041"', function () {
            assert.equal('01', AIs[0].identifier);
            assert.equal('09120049640041', AIs[0].value);

        });
        it('should return AI "17" at position 1 with value "181231"', function () {
            assert.equal('17', AIs[1].identifier);
            assert.equal('181231', AIs[1].value);

        });
        it('should return variable AI "10" at position 2 with value "50532"', function () {
            assert.equal('10', AIs[2].identifier);
            assert.equal('50532', AIs[2].value);

        });
        it('should return variable AI "21" at position 3 with value "2KP1NDMXA2BP9P6C"', function () {
            assert.equal('21', AIs[3].identifier);
            assert.equal('2KP1NDMXA2BP9P6C', AIs[3].value);

        });
        
    });
   
});


describe('GS1Reader', function () {
    
    // GS1 data matrix code without GS / ASCII 29 = only fix-length AIs
    describe('new(\'010405306372385621U16Y1PWM84SK7VSC\') fixed only length', function () {

        var code = '010405306372385621U16Y1PWM84SK7VSC';
        var myReader = new gs1reader.GS1Reader(code);
        var AIs = myReader.getApplicationIdentifiers();
            
        it('should return 2 fixed-length AIs', function () {
            assert.equal(2, AIs.length);
        });
        it('should return AI "01" at position 0 with value "04053063723856"', function () {
            assert.equal('01', AIs[0].identifier);
            assert.equal('04053063723856', AIs[0].value);

        });
        it('should return AI "21" at position 1 with value "U16Y1PWM84SK7VSC"', function () {
            assert.equal('21', AIs[1].identifier);
            assert.equal('U16Y1PWM84SK7VSC', AIs[1].value);
        });
        
    });

});

describe('GS1Reader', function () {

    // GS1 data matrix code with mixed fixed-length and variable length AIs
    describe('new(\"<GS>01040530635429071315041510123TQS<GS>21L2TEW674CZWSP4VM") mixed fix/var length with leading GS', function () {
        
        var code = "01040530635429071315041510123TQS21L2TEW674CZWSP4VM";
        var myReader = new gs1reader.GS1Reader(code);
        var AIs = myReader.getApplicationIdentifiers();  
              
        it('should return 4 AIs', function () {
            assert.equal(4, AIs.length);
        });
        it('should return AI "01" at position 0 with value "04053063542907"', function () {
            assert.equal('01', AIs[0].identifier);
            assert.equal('04053063542907', AIs[0].value);

        });
        it('should return AI "13" at position 1 with value "150415"', function () {
            assert.equal('13', AIs[1].identifier);
            assert.equal('150415', AIs[1].value);

        });
        it('should return variable AI "10" at position 2 with value "123TQS"', function () {
            assert.equal('10', AIs[2].identifier);
            assert.equal('123TQS', AIs[2].value);

        });
        it('should return variable AI "21" at position 3 with value "L2TEW674CZWSP4VM"', function () {
            assert.equal('21', AIs[3].identifier);
            assert.equal('L2TEW674CZWSP4VM', AIs[3].value);

        });
        
    });
   
});

