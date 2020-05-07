export function isEmpty(obj){
    // if (!obj) return true;
    for(let key in obj){
        return false
    }return true
}


let temp = []

export function treeNode(tree=[],key='name'){
    tree.forEach(item=>{
        temp.push(item[key])
        if(item[key]!=undefined){
            treeNode(item.children,key)
        }
    })
    return temp
}


Object.defineProperty(Object.prototype, "isEmptyObj", {
    enumerable: false,
    // writable:false,
    configurable:false,
    get:function() {
      return function () {
        for (let key in this) {
          return false;
        }
        return true;
      };
    },
  });
