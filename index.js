var white = ' \f\n\r\t\v\u00A0\u2028\u2029'.split('')
var NODE_WHITE_SPACE = 1
var NODE_LINE_COMMENT = 2
var NODE_BLOCK_COMMENT = 3
var NODE_USE_STRICT = 4

function parse(str) {
  var i=0, c, next
  var length = str.length
  var ast = [], node={}
  var lines = 1
  var cols = 0
  var prev = 0
  main_loop:
  for(;i<length;){
    c = str[i]
    next = str[i+1]
    cols+=(i-prev)
    prev = i
    if(c==='\n') lines++, cols=0, prev++
    switch (node.type){
      case NODE_WHITE_SPACE:{
        if(white.indexOf(c) < 0) {
             node.end = i-1
             ast.push(node)
             node={}
         } else {
           i++
         }
         break
      }
      case NODE_LINE_COMMENT:{
        if(c==='\n') {
            node.end = i
            ast.push(node)
            node={}
        }
        i++
        break
      }
      case NODE_BLOCK_COMMENT:{
        if(c==='*' && next==='/'){
          i++
          node.end = i
          ast.push(node)
          node={}
        }
        i++
        break
      }
      default:{
        if(white.indexOf(c) > -1) node = {type: NODE_WHITE_SPACE, start: i, end: i}
        else if(c==='/' && next==='/') node = {type: NODE_LINE_COMMENT, start: i, end: i}
        else if(c==='/' && next==='*') node = {type: NODE_BLOCK_COMMENT, start: i, end: i}
        else break main_loop
        i++
      }
    }
  }
  if(i>=length && node.type!=null) {
    node.end = i-1
    ast.push(node)
  }
  
  var start = i
  var useStrict = false
  var strict = /^['"]use strict['"]\s*;?/i.exec(str.substr(i))
  if(strict) {
    var strictLen = strict[0].length
    start = i+strictLen
    cols+=strictLen
    ast.push({
      type: NODE_USE_STRICT,
      start: i,
      end: start-1
    })
    useStrict = true
  }
  return {
    start: start,
    line: lines,
    col: cols,
    strict: useStrict,
    ast: ast
  }
}

module.exports = parse

