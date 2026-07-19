import type { TableConfigSchema } from '@/modules/dynamic-form-v2/interfaces';
import { PersonnelType } from '../../vendor';

export const VendorCompetencyTable: TableConfigSchema = {
  endpoint: `/vendor-competency-temps`,
  columns: [
    { field: 'subCompetencyItem.competencyItem.competency.name', title: 'Category' },
    { field: 'subCompetencyItem.competencyItem.name', title: 'Competency' },
    { field: 'subCompetencyItem.name', title: 'Sub Competency' },
    // { field: 'certificateNumber', title: 'Certificate Number' },
    // { field: 'issueDate', title: 'Issue Date' },
    // { field: 'expireDate', title: 'Expire Date' },
  ],
  sortable: true,
  searchable: true,
  pagination: true,
  selectable: true,
  actions: ['view', 'edit', 'delete']
};
