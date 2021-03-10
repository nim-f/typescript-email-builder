import { ITreeRow } from '../types/row'

export const list_to_tree = (list: any[]) => {
    let map = {},
        node,
        roots = [],
        i

    for (i = 0; i < list.length; i += 1) {
        // @ts-ignore
        map[list[i].id] = i // initialize the map
        list[i].children = [] // initialize the children
    }

    for (i = 0; i < list.length; i += 1) {
        node = list[i]
        console.log({ node })
        if (node.parent !== 'root') {
            // if you have dangling branches check that map[node.parentId] exists
            // @ts-ignore
            list[map[node.parent]] && list[map[node.parent]].children.push(node)
        } else {
            roots.push(node)
        }
    }
    return roots
}
