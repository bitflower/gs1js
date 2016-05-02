"use strict";
var helpers = require('./Helpers/Helpers');
var gs1helpers = require('./Helpers/GS1Helpers');
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
//# sourceMappingURL=GS1Reader.js.map