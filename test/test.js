const test = require('ava')
const parse = require('../')

test('should not throw', t=>{
  t.deepEqual(parse(``), {
    start: 0,
    ast:[]
  })
  t.deepEqual(parse(`var a=1;`), {
    start: 0,
    ast: []
  })
  t.deepEqual(parse(`  var a=1;`), {
    start: 2,
    ast:[{
    type:1, start:0, end:1
  }]})
  t.deepEqual(parse(`//\nvar a=1;`), {
    start: 3,
    ast:[{
    type:2, start:0, end:2
  }]})
  t.deepEqual(parse(`/**/var a=1;`), {
    start: 4,
    ast:[{
    type:3, start:0, end:3
  }]})
})
test('should work', t=>{
  var code = `
   

// sdoifj
  
/*io
  
//sd/*fjo*/

'use strict'

`

  const ast = parse(code)
  t.deepEqual(ast, {
    start: 40,
    ast: [
    { type: 1, start: 0, end: 5 },
    { type: 2, start: 6, end: 15 },
    { type: 1, start: 16, end: 18 },
    { type: 3, start: 19, end: 37 },
    { type: 1, start: 38, end: 39 } ]
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
    ast: [
    { type: 1, start: 0, end: 5 },
    { type: 2, start: 6, end: 15 },
    { type: 1, start: 16, end: 18 },
    { type: 3, start: 19, end: 37 },
    { type: 1, start: 38, end: 40 } ]
  })
})

