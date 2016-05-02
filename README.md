## Intro

GS1JS parses GS1 bar codes with fix-length and variable length application identifiers (AI).

## Usage

In the browser:

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