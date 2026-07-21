import type { LookupSchema } from '@/modules/dynamic-form-v2/interfaces/lookup.interface';
import { HttpMethod } from '@/modules/dynamic-form-v2/enums/http-method.enum';
import { TreeLookupSchema } from '@/modules/dynamic-form-v2';

export const CompetencyLookup: LookupSchema = {
  endpoint: '/lookups/competency-tree',
  method: HttpMethod.GET,

    valueField: 'id',
    labelField: 'label',

    childrenField: 'children',
    selectableField: 'selectable',

    searchParam: 'search',

    tree: true
};
