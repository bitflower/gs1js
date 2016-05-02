(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var cr = require('./src/GS1Reader');

var code = '010405306372385621U16Y1PWM84SK7VSC';

var myReader = new cr.GS1Reader(code);

console.log(myReader.getApplicationIdentifiers);
},{"./src/GS1Reader":3}],2:[function(require,module,exports){
"use strict";
var ApplicationIdentifier = (function () {
    function ApplicationIdentifier(identifier, value) {
        this.identifier = identifier;
        this.value = value;
        this.length = value.length;
    }
    return ApplicationIdentifier;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ApplicationIdentifier;

},{}],3:[function(require,module,exports){
"use strict";
var helpers = require('./helpers');
var gs1helpers = require('./gs1-helpers');
var GS1Reader = (function () {
    function GS1Reader(code, bytes) {
        if (bytes === void 0) { bytes = []; }
        this.code = code;
        this.bytes = bytes;
        // Extract bytes of not present
        this.checkBytes();
        // Read identifier positions if present
        this.identifierPositions = gs1helpers.getGroupSeparators(this.bytes);
        this.hasidentifiers = (this.identifierPositions.length > 0);
        this.extractIdentifiers();
    }
    GS1Reader.prototype.checkBytes = function () {
        // Is the bytes array filled?
        if (!this.bytes || this.bytes.length === 0) {
            // If not, convert text into byte array
            this.bytes = helpers.getASCIIArray(this.code);
        }
    };
    GS1Reader.prototype.extractIdentifiers = function () {
        if (this.hasidentifiers) {
            this.identifiers = gs1helpers.extractGSIds(this.bytes, this.identifierPositions);
        }
        else {
            this.identifiers = gs1helpers.extractFixIds(this.code);
        }
    };
    GS1Reader.prototype.getApplicationIdentifiers = function () {
        return this.identifiers;
    };
    return GS1Reader;
}());
exports.GS1Reader = GS1Reader;

},{"./gs1-helpers":4,"./helpers":6}],4:[function(require,module,exports){
"use strict";
var helpers = require('./helpers');
var gs1_predefined_ais_1 = require('./gs1-predefined-ais');
var ApplicationIdentifier_1 = require('./ApplicationIdentifier');
// Helper: Reads positions of group separator symbols (ascii 29)
function getGroupSeparators(ascii) {
    var grp = [];
    for (var i = 0; i < ascii.length; i++) {
        if (ascii[i] === 29) {
            grp.push(i);
        }
    }
    return grp;
}
exports.getGroupSeparators = getGroupSeparators;
// Split array at group separators
function splitBinAtGS(bytes, gs) {
    var parts = [];
    var start = 0;
    for (var i = 0; i <= gs.length; i++) {
        if (i < gs.length) {
            parts.push(bytes.slice(start, gs[i]));
            start = gs[i] + 1;
        }
        else {
            parts.push(bytes.slice(start));
        }
    }
    return parts;
}
exports.splitBinAtGS = splitBinAtGS;
// Extract IDs of group separators
function extractGSIds(bytes, gs) {
    var parts = splitBinAtGS(bytes, gs);
    var ids = [];
    // Get first identifier on position 1
    //ids[0] = helpers.bin2String(parts[0]);
    //ids.push(new ApplicationIdentifier(id.toString(), helpers.bin2String(part.slice(2))));
    for (var i = 0; i < parts.length; i++) {
        var part = parts[i];
        var id = parseInt(String.fromCharCode(part[0]) + String.fromCharCode(part[1]));
        //ids[id] = helpers.bin2String(part.slice(2));
        ids.push(new ApplicationIdentifier_1.default(id.toString(), helpers.bin2String(part.slice(2))));
    }
    return ids;
}
exports.extractGSIds = extractGSIds;
function extractFixIds(code) {
    // Minimum length is 2
    if (code.length <= 1) {
        return [];
    }
    var ids = [];
    // Loop over all available, predefined, fixed length identifiers
    for (var i = 0, l = gs1_predefined_ais_1.default.FIXED_LENGTH_IDENTIFIERS.length; i < l; i++) {
        if (code.length <= 1) {
            break;
        }
        // Check if the first 2 chars match one of the predefined identifiers
        if (code.substr(0, 2) === gs1_predefined_ais_1.default.FIXED_LENGTH_IDENTIFIERS[i].ai) {
            // Cut off the 2 digits of the identifier from the code
            code = code.substring(2);
            // Extract length of idenditifer from code
            ids.push(new ApplicationIdentifier_1.default(gs1_predefined_ais_1.default.FIXED_LENGTH_IDENTIFIERS[i].ai, code.substring(gs1_predefined_ais_1.default.FIXED_LENGTH_IDENTIFIERS[i].length)));
            // Cut off code length from code snippet
            code = code.substring(gs1_predefined_ais_1.default.FIXED_LENGTH_IDENTIFIERS[i].length);
        }
    }
    return ids;
}
exports.extractFixIds = extractFixIds;

},{"./ApplicationIdentifier":2,"./gs1-predefined-ais":5,"./helpers":6}],5:[function(require,module,exports){
"use strict";
// GS1 table of pre-defined elements and their length
// As defined in http://www.gs1.org/docs/barcodes/GS1_General_Specifications.pdf
// Chapter 5.10.1
var GS1Assets = (function () {
    function GS1Assets() {
    }
    GS1Assets.FIXED_LENGTH_IDENTIFIERS = [{
            ai: '00',
            length: 20
        }, {
            ai: '01',
            length: 16
        }, {
            ai: '02',
            length: 16
        }, {
            ai: '03',
            length: 16
        }, {
            ai: '04',
            length: 18
        }, {
            ai: '11',
            length: 8
        }, {
            ai: '12',
            length: 8
        }, {
            ai: '13',
            length: 8
        }, {
            ai: '14',
            length: 8
        }, {
            ai: '15',
            length: 8
        }, {
            ai: '16',
            length: 8
        }, {
            ai: '17',
            length: 8
        }, {
            ai: '18',
            length: 8
        }, {
            ai: '19',
            length: 8
        }, {
            ai: '20',
            length: 4
        }, {
            ai: '31',
            length: 10
        }, {
            ai: '32',
            length: 10
        }, {
            ai: '33',
            length: 10
        }, {
            ai: '34',
            length: 10
        }, {
            ai: '35',
            length: 10
        }, {
            ai: '36',
            length: 10
        }, {
            ai: '41',
            length: 16
        }];
    return GS1Assets;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GS1Assets;

},{}],6:[function(require,module,exports){
"use strict";
// Helper: Make bin array from string
function getASCIIArray(str) {
    var asciiArray = [];
    for (var i = 0; i < str.length; i++) {
        asciiArray.push(str.charCodeAt(i));
    }
    return asciiArray;
}
exports.getASCIIArray = getASCIIArray;
// Helper: Make string from bin array
function bin2String(array) {
    return String.fromCharCode.apply(String, array);
}
exports.bin2String = bin2String;

},{}]},{},[1]);
