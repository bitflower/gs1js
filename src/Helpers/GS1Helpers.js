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
    var codeWorking = code;
    var ids = [];
    // Loop over all available, predefined, fixed length identifiers
    for (var i = 0, l = GS1Assets_1.default.FIXED_LENGTH_IDENTIFIERS.length; i < l; i++) {
        if (codeWorking.length <= 1) {
            break;
        }
        var id = GS1Assets_1.default.FIXED_LENGTH_IDENTIFIERS[i].ai;
        var len = GS1Assets_1.default.FIXED_LENGTH_IDENTIFIERS[i].length;
        var lenId = GS1Assets_1.default.FIXED_LENGTH_IDENTIFIERS[i].ai.length;
        // Check if the first 2 chars match one of the predefined identifiers
        if (codeWorking.substr(0, lenId) === id) {
            // Cut off the 2 digits of the identifier from the code
            // codeWorking = codeWorking.substring(2);
            // Extract length of idenditifer from code
            var idValue = codeWorking.substring(lenId, len);
            // Push new AI to array            
            ids.push(new ApplicationIdentifier_1.default(id, idValue));
            // Cut off code length from code snippet
            codeWorking = codeWorking.substring(len);
            // Reset loop to restart with first AI of predefined AIs
            i = 0;
        }
    }
    return ids;
}
exports.extractFixIds = extractFixIds;
//# sourceMappingURL=GS1Helpers.js.map