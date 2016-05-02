(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.gs1js = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
"use strict";
var helpers = require('./Helpers/Helpers');
var gs1helpers = require('./Helpers/GS1Helpers');
var GS1Reader = (function () {
    function GS1Reader(code, bytes) {
        if (bytes === void 0) { bytes = []; }
        this.code = code;
        this.bytes = bytes;
        this.checkBytes();
        this.identifierPositions = gs1helpers.getGroupSeparators(this.bytes);
        this.hasidentifiers = (this.identifierPositions.length > 0);
        this.extractIdentifiers();
    }
    GS1Reader.prototype.checkBytes = function () {
        if (!this.bytes || this.bytes.length === 0) {
            this.bytes = helpers.getASCIIArray(this.code);
        }
        this.bytes = gs1helpers.cleanStart(this.bytes);
        this.code = helpers.bin2String(this.bytes);
    };
    GS1Reader.prototype.extractIdentifiers = function () {
        this.identifiers = gs1helpers.extractIds(this.code);
    };
    GS1Reader.prototype.getApplicationIdentifiers = function () {
        return this.identifiers;
    };
    return GS1Reader;
}());
exports.GS1Reader = GS1Reader;

},{"./Helpers/GS1Helpers":4,"./Helpers/Helpers":5}],3:[function(require,module,exports){
"use strict";
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
    GS1Assets.getFixedLengthIdentifier = function (ai) {
        for (var i = 0, l = this.FIXED_LENGTH_IDENTIFIERS.length; i < l; i++) {
            if (this.FIXED_LENGTH_IDENTIFIERS[i].ai === ai) {
                return this.FIXED_LENGTH_IDENTIFIERS[i];
            }
        }
        return null;
    };
    return GS1Assets;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GS1Assets;

},{}],4:[function(require,module,exports){
"use strict";
var helpers = require('./Helpers');
var GS1Assets_1 = require('./GS1Assets');
var ApplicationIdentifier_1 = require('../ApplicationIdentifier');
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
function cleanStart(bytes) {
    if (bytes && bytes.length > 0 && bytes[0] == 29) {
        bytes.shift();
    }
    return bytes;
}
exports.cleanStart = cleanStart;
function extractIds(code) {
    if (code.length <= 1) {
        return [];
    }
    var codeWorking = code;
    var ids = [];
    var gap = 1;
    var startPos = 0;
    while (startPos < codeWorking.length) {
        if (gap > 300) {
            break;
        }
        var guessAI = codeWorking.substr(startPos, gap);
        var binArray = helpers.getASCIIArray(guessAI);
        var isGS = binArray[binArray.length - 1] == 29;
        if (!isGS) {
            var fixedLengthAI = GS1Assets_1.default.getFixedLengthIdentifier(guessAI);
            if (!fixedLengthAI) {
                if (startPos + gap >= codeWorking.length) {
                    var dynamicAI = codeWorking.substr(startPos, gap);
                    var id = dynamicAI.substr(0, 2);
                    var value = dynamicAI.substr(2);
                    ids.push(new ApplicationIdentifier_1.default(id, value));
                    break;
                }
                gap++;
            }
            else {
                var lenId = fixedLengthAI.ai.length;
                var idValue = codeWorking.substr(startPos + lenId, fixedLengthAI.length - lenId);
                ids.push(new ApplicationIdentifier_1.default(fixedLengthAI.ai, idValue));
                startPos += fixedLengthAI.length;
                gap = 1;
            }
        }
        else {
            var dynamicAI = codeWorking.substr(startPos, gap);
            var id = dynamicAI.substr(0, 2);
            var value = dynamicAI.substr(2);
            value = value.substr(0, value.length - 1);
            ids.push(new ApplicationIdentifier_1.default(id, value));
            startPos += gap;
            gap = 1;
        }
    }
    return ids;
}
exports.extractIds = extractIds;

},{"../ApplicationIdentifier":1,"./GS1Assets":3,"./Helpers":5}],5:[function(require,module,exports){
"use strict";
function getASCIIArray(str) {
    var asciiArray = [];
    for (var i = 0; i < str.length; i++) {
        asciiArray.push(str.charCodeAt(i));
    }
    return asciiArray;
}
exports.getASCIIArray = getASCIIArray;
function bin2String(array) {
    return String.fromCharCode.apply(String, array);
}
exports.bin2String = bin2String;

},{}],6:[function(require,module,exports){
var gs1js = require('../dist/GS1Reader');

// Offer the package to the global scope
window.gs1js = gs1js;
},{"../dist/GS1Reader":2}]},{},[6])(6)
});


//# sourceMappingURL=gs1js.js.map
