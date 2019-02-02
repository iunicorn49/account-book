let obj = { name: 'obj' }

const fn = (obj) => {
  obj.name = 'fn'
  return obj
} 

console.log('obj', obj)
fn(obj)

console.log('fn', obj)