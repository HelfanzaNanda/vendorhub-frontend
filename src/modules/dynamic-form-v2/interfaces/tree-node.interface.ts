export interface TreeNode {
    id: number | string;
    label: string;
    selectable: boolean;
    children?: TreeNode[];

    [key: string]: any;
}
