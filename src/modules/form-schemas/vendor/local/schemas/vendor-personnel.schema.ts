import { FormSchema, FormLayout, tableField, FieldType } from '@/modules/form-engine';
import { FullGrid } from '@/modules/form-engine/grids';
import { RequiredValidation } from '@/modules/form-engine/validation';
import { VendorAuthorizedSignerTable, VendorBoardDirectorTable, VendorShareholderTable } from '@/modules/form-schemas/shared';
import {
    PersonnelConstants,
} from '@/modules/form-schemas/vendor/common';
import { AuthorizedSignerSchema, BoardOfDirectorSchema, ShareholderSchema } from '../nested';
import { fieldRendererRegistry } from '@/modules/form-engine/renderers/registry/field-renderer.registry';
import { ShareholderTableRenderer } from '../nested/shareholder.renderer';

// Dynamically inject custom renderer for Shareholder table validation and ownership summary
(fieldRendererRegistry as any)['SHAREHOLDER_TABLE'] = ShareholderTableRenderer;

const shareholderField = tableField({
    name: PersonnelConstants.FIELD_SHAREHOLDERS,
    label: PersonnelConstants.SECTION_SHAREHOLDER_TITLE,
    helperText: PersonnelConstants.SECTION_SHAREHOLDER_DESCRIPTION,
    grid: FullGrid,
    table: VendorShareholderTable,
    schema: ShareholderSchema,
    validation: {
        required: RequiredValidation.required
    }
});
shareholderField.type = 'SHAREHOLDER_TABLE' as FieldType;

export const VendorPersonnelSchema: FormSchema = {
    id: PersonnelConstants.SCHEMA_ID,
    title: PersonnelConstants.SCHEMA_TITLE,
    code: PersonnelConstants.SCHEMA_ID,
    layout: FormLayout.DEFAULT,
    sections: [
        {
            id: PersonnelConstants.SECTION_BOARD_OF_DIRECTORS_ID,
            code: PersonnelConstants.SECTION_BOARD_OF_DIRECTORS_CODE,
            title: PersonnelConstants.SECTION_BOARD_OF_DIRECTORS_TITLE,
            layout: FormLayout.TABLE,
            fields: [
                tableField({
                    name: PersonnelConstants.FIELD_BOARD_OF_DIRECTORS,
                    label: PersonnelConstants.SECTION_BOARD_OF_DIRECTORS_TITLE,
                    helperText: PersonnelConstants.SECTION_BOARD_OF_DIRECTORS_DESCRIPTION,
                    grid: FullGrid,
                    table: VendorBoardDirectorTable,
                    schema: BoardOfDirectorSchema,
                    validation: {
                        required: RequiredValidation.required
                    }
                })
            ]
        },
        {
            id: PersonnelConstants.SECTION_SHAREHOLDER_ID,
            code: PersonnelConstants.SECTION_SHAREHOLDER_CODE,
            title: PersonnelConstants.SECTION_SHAREHOLDER_TITLE,
            layout: FormLayout.TABLE,
            fields: [
                shareholderField
            ]
        },
        {
            id: PersonnelConstants.SECTION_AUTHORIZED_SIGNER_ID,
            code: PersonnelConstants.SECTION_AUTHORIZED_SIGNER_CODE,
            title: PersonnelConstants.SECTION_AUTHORIZED_SIGNER_TITLE,
            layout: FormLayout.TABLE,
            fields: [
                tableField({
                    name: PersonnelConstants.FIELD_AUTHORIZED_SIGNERS,
                    helperText: PersonnelConstants.SECTION_AUTHORIZED_SIGNER_DESCRIPTION,
                    label: PersonnelConstants.SECTION_AUTHORIZED_SIGNER_TITLE,
                    grid: FullGrid,
                    table: VendorAuthorizedSignerTable,
                    schema: AuthorizedSignerSchema,
                    validation: {
                        required: RequiredValidation.required
                    }
                })
            ]
        }
    ]
};
