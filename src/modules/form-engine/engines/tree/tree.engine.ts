import type { TreeNode } from '../../interfaces';

import { TreeUtils } from './tree.utils';
import { TreeSearch } from './tree.search';

export class TreeEngine {

    static findById( nodes: TreeNode[], id: number | string ) {
        return TreeUtils.findById( nodes, id );
    }

    static filter( nodes: TreeNode[], keyword: string ) {
        return TreeSearch.filter( nodes, keyword );
    }

    static walk( nodes: TreeNode[], callback: ( node: TreeNode, level: number, parent?: TreeNode ) => void ) {
        TreeUtils.walk( nodes, callback );
    }

    static attachParent( nodes: TreeNode[] ) {
        return TreeUtils.attachParent(nodes);
    }

}
