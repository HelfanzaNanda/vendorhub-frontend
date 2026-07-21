export const AuthorizedSignerDocumentEnum = {
    KONTRAK: 'KONTRAK',
    BAST: 'BAST',
    BAUT: 'BAUT',
    BAPK: 'BAPK',
} as const;

export type AuthorizedSignerDocumentEnum = typeof AuthorizedSignerDocumentEnum[keyof typeof AuthorizedSignerDocumentEnum];
