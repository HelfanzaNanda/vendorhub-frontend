import type { LookupSchema } from '@/modules/form-engine';
import { AuthorizedSignerDocumentEnum } from '@/modules/form-engine/enums/authorized-signer-document.enum';

export const AuthorizedSignerDocumentTypeLookup: LookupSchema = {
    type: 'STATIC',
    options: [
        {
            id: AuthorizedSignerDocumentEnum.KONTRAK,
            name: AuthorizedSignerDocumentEnum.KONTRAK
        },
        {
            id: AuthorizedSignerDocumentEnum.BAST,
            name: AuthorizedSignerDocumentEnum.BAST
        },
        {
            id: AuthorizedSignerDocumentEnum.BAUT,
            name: AuthorizedSignerDocumentEnum.BAUT
        },
        {
            id: AuthorizedSignerDocumentEnum.BAPK,
            name: AuthorizedSignerDocumentEnum.BAPK
        }
    ],
    labelField: 'name',
    valueField: 'id'
};
