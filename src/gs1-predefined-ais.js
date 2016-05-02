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
//# sourceMappingURL=gs1-predefined-ais.js.map