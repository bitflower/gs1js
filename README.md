## Intro

GS1JS parses GS1 bar codes with fix-length and variable length application identifiers (AI). It recognizes code content of mixed nature meaning it can read codes that contain fixed-length AND variable length identifiers.

It does not check for the symbology identifier at this point but instead parses only codes of type ]d2 which corresponds to data matrix.

It reads these fixed-length AIs defined in the official doc:
http://www.gs1.org/docs/barcodes/GS1_DataMatrix_Guideline.pdf
Table 2-2 "Element Strings with Pre-Defined Length Using Application Identifiers (GS1 General Specifications
Figure 5.10.1-2)"

The parsing process was highly inspired by the given chart in the doc:
http://www.gs1.org/docs/barcodes/GS1_DataMatrix_Guideline.pdf
Figure 2-1 "Processing of Data from a scanned GS1 DataMatrix Symbol"

More on the symbology identifier here:
http://www.gs1.org/docs/barcodes/GS1_General_Specifications.pdf
Figure 5.1.2-2. "ISO/IEC 15424 symbology identifiers used in the GS1 system"

## Usage

### In a node app

```javascript
// The code to read/parse
var code = '0109120049640041171812311050532212KP1NDMXA2BP9P6C';

// Call the constructor from the global scope
var gs1js = require('gs1js/GS1Reader');
var myReader = new gs1js.GS1Reader(code);

// Read the found AIs
var AIs = myReader.getApplicationIdentifiers();
```

### In the browser:

```javascript
// The code to read/parse
var code = '0109120049640041171812311050532212KP1NDMXA2BP9P6C';

// Call the constructor from the global scope
var myReader = new gs1js.GS1Reader(code);

// Read the found AIs
console.log(myReader.getApplicationIdentifiers());
```

## Installation

```
npm install gs1js
```

## Tests

```
npm test
```

or

```
mocha
```

## Contributing

Pull requests are welcome !

## License

(MIT License)

Copyright (c) 2016 Matthias Max

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.