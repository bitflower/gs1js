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
