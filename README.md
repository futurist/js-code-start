# js-code-start
Find js code start point, skip any whitespace and comments.

When you want to place some code at beginning of JS file, you don't want to messup `"use strict"` block, so this module help find the first real code beginning, thus skip any whitespace, comments, and `"use strict"` block.

## Usage

```js
const findStart = require('js-code-start')
var code = `
// line comment
// line comment
/*
Block comment
*/

'use strict';

console.log('code start');
`
console.log(findStart(code))
```

The result is

```
{ start: 67,
  strict: true,
  ast: 
   [ { type: 1, start: 0, end: 0 },
     { type: 2, start: 1, end: 16 },
     { type: 2, start: 17, end: 32 },
     { type: 3, start: 33, end: 51 },
     { type: 1, start: 52, end: 53 },
     { type: 4, start: 54, end: 66 } ] }
```

And the js code start point is `67`, in `strict mode`.

