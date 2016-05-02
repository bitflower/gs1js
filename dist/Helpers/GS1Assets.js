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
