import type { TableConfigSchema } from '@/modules/form-engine/interfaces';


export const VendorCompetencyTable: TableConfigSchema = {
  endpoint: `/vendor-competency-temps`,
  columns: [
    { field: 'subCategoryItem.subCategory.category.name', title: 'Category' },
    { field: 'subCategoryItem.subCategory.name', title: 'Competency' },
    { field: 'subCategoryItem.name', title: 'Sub Competency' },
  ],
  sortable: true,
  searchable: true,
  pagination: true,
  selectable: true,
  actions: ['view', 'edit', 'delete']
};
