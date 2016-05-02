"use strict";
var helpers = require('./Helpers');
var GS1Assets_1 = require('./GS1Assets');
var ApplicationIdentifier_1 = require('../ApplicationIdentifier');
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
