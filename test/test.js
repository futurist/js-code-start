const test = require('ava')
const parse = require('../')

test('should not throw', t=>{
  t.deepEqual(parse(``), {
    start: 0,
    strict: false,
    ast:[]
  })
  t.deepEqual(parse(`var a=1;`), {
    start: 0,
    strict: false,
    ast: []
  })
  t.deepEqual(parse(`'use strict'; var a=1;`), {
    start: 13,
    strict: true,
    ast: [{type:4, start:0, end: 12}]
  })
  t.deepEqual(parse(`  var a=1;`), {
    start: 2,
    strict: false,
    ast:[{
    type:1, start:0, end:1
  }]})
  t.deepEqual(parse(`//\nvar a=1;`), {
    start: 3,
    strict: false,
    ast:[{
    type:2, start:0, end:2
  }]})
  t.deepEqual(parse(`/**/var a=1;`), {
    start: 4,
    strict: false,
    ast:[{
    type:3, start:0, end:3
  }]})
})
test('should work', t=>{
  var code = `
   

// sdoifj
  
/*io
  
//sd/*fjo*/

'use strict';

`

  const ast = parse(code)
  t.deepEqual(ast, {
    start: 53,
    strict: true,
    ast: [
    { type: 1, start: 0, end: 5 },
    { type: 2, start: 6, end: 15 },
    { type: 1, start: 16, end: 18 },
    { type: 3, start: 19, end: 37 },
    { type: 1, start: 38, end: 39 },
    { type: 4, start: 40, end: 52 },
  ]
  })
})


test('all skip', t=>{
  var code = `
   

// sdoifj
  
/*io
  
//sd/*fjo*/


`

  const ast = parse(code)
  t.deepEqual(ast, {
    start: 41,
    strict: false,
    ast: [
    { type: 1, start: 0, end: 5 },
    { type: 2, start: 6, end: 15 },
    { type: 1, start: 16, end: 18 },
    { type: 3, start: 19, end: 37 },
    { type: 1, start: 38, end: 40 }]
  })
})

