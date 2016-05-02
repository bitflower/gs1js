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
