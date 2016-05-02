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
