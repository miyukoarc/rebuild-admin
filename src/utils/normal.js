export function isEmpty(obj) {
  for (let key in obj) {
    return false
  } return true
}


let temp = []

export function treeNode(tree = [], key = 'name') {
  tree.forEach(item => {
    temp.push(item[key])
    if (item[key] != undefined) {
      treeNode(item.children, key)
    }
  })
  return temp
}



export function requestWarn(msg) {
  console.error("[request error]: "+ msg);
}


// 在生产环境下关闭console.log
// if (process.env.NODE_ENV === "production") {
//   window['console']['log'] = function() {};
// }
  