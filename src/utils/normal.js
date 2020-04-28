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

