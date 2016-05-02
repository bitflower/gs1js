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
//# sourceMappingURL=gs1-helpers.js.map