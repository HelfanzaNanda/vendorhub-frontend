export interface TreeOption {

    id:number;

    label:string;

    level:number;

    selectable:boolean;

    path:string;

    children?:TreeOption[];

}
