"use strict";
var helpers = require('./Helpers');
var GS1Assets_1 = require('./GS1Assets');
var ApplicationIdentifier_1 = require('../ApplicationIdentifier');
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
// Remove faulty first GS (ASCII 29) from code
// Some scanner deliver the Code 232 as GS / ASCII 29
function cleanStart(bytes) {
    if (bytes && bytes.length > 0 && bytes[0] == 29) {
        bytes.shift();
    }
    return bytes;
}
exports.cleanStart = cleanStart;
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
    // Clone code content to work with
    var codeWorking = code;
    // Array to hold the found AIs
    var ids = [];
    // Loop through code - char by char
    // Parts of the code are borrowed from BarkJS
    // https://github.com/Sleavely/Bark-JS/blob/master/lib/bark.js
    var gap = 1;
    var startPos = 0;
    // debugger;
    while (startPos < codeWorking.length) {
        // Notbremse
        if (gap > 300) {
            break;
        }
        var guessAI = codeWorking.substr(startPos, gap);
        // At the end of an AI value: check if there is a GS / ASCII 29 char
        // which indicates the beginning of a dynamic length AI
        var binArray = helpers.getASCIIArray(guessAI);
        var isGS = binArray[binArray.length - 1] == 29;
        if (!isGS) {
            // Check if there exists an fixed-length AI for this guess
            var fixedLengthAI = GS1Assets_1.default.getFixedLengthIdentifier(guessAI);
            // Every time we cant guess the next AI we make the gap just a little bigger.
            // Otherwise jump.        
            if (!fixedLengthAI) {
                // End reached / last AI
                if (startPos + gap >= codeWorking.length) {
                    // Read dynamic length AI
                    var dynamicAI = codeWorking.substr(startPos, gap);
                    // Extraxt ID
                    var id = dynamicAI.substr(0, 2);
                    var value = dynamicAI.substr(2);
                    // Push new AI to array            
                    ids.push(new ApplicationIdentifier_1.default(id, value));
                    break;
                }
                // I.e. if we just tried to find a method for "0" in the string "015730033004934115160817", try "01" next time
                gap++;
            }
            else {
                var lenId = fixedLengthAI.ai.length;
                // Extract value
                var idValue = codeWorking.substr(startPos + lenId, fixedLengthAI.length - lenId);
                // Push new AI to array            
                ids.push(new ApplicationIdentifier_1.default(fixedLengthAI.ai, idValue));
                // The AI parser will return the end position of its data
                startPos += fixedLengthAI.length;
                gap = 1;
            }
        }
        else {
            // Read dynamic length AI
            var dynamicAI = codeWorking.substr(startPos, gap);
            // Extraxt ID
            var id = dynamicAI.substr(0, 2);
            var value = dynamicAI.substr(2);
            // Push new AI to array            
            ids.push(new ApplicationIdentifier_1.default(id, value));
            // Jump to spot after 
            startPos += gap;
            gap = 1;
        }
    }
    // Return the found AIs
    return ids;
}
exports.extractFixIds = extractFixIds;
//# sourceMappingURL=GS1Helpers.js.map