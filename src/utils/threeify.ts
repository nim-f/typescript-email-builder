
export const list_to_tree = (list: any[]) => {
    let map = {},
        node,
        roots = [],
        i

    for (i = 0; i < list.length; i += 1) {
        // @ts-ignore
        map[list[i].id] = i // initialize the map
        list[i].items = [] // initialize the children
    }

    for (i = 0; i < list.length; i += 1) {
        node = list[i]
        if (node.parent !== 'root') {
            // if you have dangling branches check that map[node.parentId] exists
            // @ts-ignore
            list[map[node.parent]] && list[map[node.parent]].items.push(node)
        } else {
            roots.push(node)
        }
    }
    return roots
}
