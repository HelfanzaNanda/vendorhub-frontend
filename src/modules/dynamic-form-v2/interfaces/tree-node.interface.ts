export interface TreeNode {
    id: number | string;
    label: string;
    selectable: boolean;
    children?: TreeNode[];
    parent?: TreeNode;

    [key: string]: any;
}
