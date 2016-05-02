
// Helper: Make bin array from string
export function getASCIIArray(str: string) {

    var asciiArray = [];
    for (var i = 0; i < str.length; i++) {
        asciiArray.push(str.charCodeAt(i));
    }
    return asciiArray;
}

// Helper: Make string from bin array
export function bin2String(array: any) {
    return String.fromCharCode.apply(String, array);
}