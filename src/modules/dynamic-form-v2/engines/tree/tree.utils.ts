import type { TreeNode } from '../../interfaces';

export class TreeUtils {

    static walk(
        nodes: TreeNode[],
        callback: (node: TreeNode, level: number, parent?: TreeNode) => void,
        level = 0,
        parent?: TreeNode
    ) {

        for (const node of nodes) {

            callback(node, level, parent);

            if (node.children?.length) {
                this.walk(
                    node.children,
                    callback,
                    level + 1,
                    node
                );
            }

        }

    }

    static findById(
        nodes: TreeNode[],
        id: number | string
    ): TreeNode | null {

        for (const node of nodes) {

            if (node.id === id) {
                return node;
            }

            if (node.children?.length) {

                const found = this.findById(
                    node.children,
                    id
                );

                if (found) {
                    return found;
                }

            }

        }

        return null;

    }

}
