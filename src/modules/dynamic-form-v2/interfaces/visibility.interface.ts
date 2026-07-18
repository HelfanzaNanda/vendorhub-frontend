import { ConditionOperator } from "../enums";

export interface VisibilitySchema {
    condition?: {
        field: string;
        operator: ConditionOperator;
        value: unknown;
    };
}
