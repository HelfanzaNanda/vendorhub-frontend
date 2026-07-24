import type { LookupSchema } from '@/modules/form-engine/interfaces/lookup.interface';
import { HttpMethod } from '@/modules/form-engine/enums/http-method.enum';
import { TreeLookupSchema } from '@/modules/form-engine';

export const CompetencyLookup: LookupSchema = {
  endpoint: '/lookups/competency-tree',
  method: HttpMethod.GET,

    valueField: 'id',
    labelField: 'name',

    childrenField: 'children',
    selectableField: 'selectable',

    searchParam: 'search',

    tree: true
};
