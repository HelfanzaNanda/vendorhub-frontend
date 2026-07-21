import type { TreeNode } from '../../interfaces';

export class TreeSearch {

    static filter( nodes: TreeNode[], keyword: string ): TreeNode[] {

        if (!keyword) {
            return nodes;
        }

        const query = keyword.toLowerCase();
        const search = (items: TreeNode[]): TreeNode[] => {
            return items.reduce<TreeNode[]>((result, node) => {
                const matched = node.label.toLowerCase().includes(query);

                const children = node.children ? search(node.children) : [];
                if (matched || children.length) {
                    result.push({ ...node, children });
                }
                return result;
            }, []);
        };
        return search(nodes);
    }
}
