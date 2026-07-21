'use client';
import React from 'react';

import { Box, Typography, Paper, List, ListItem, ListItemText, ListItemButton, ListSubheader, Card, Tabs, Tab } from '@mui/material';
import { MainSchema } from '../../vendor';
import { SchemaRegistry } from '@/modules/form-engine/registries';


interface LayoutVendorNavbarProps {
    schemas: MainSchema[];
    selectedSchema: MainSchema | null;
    onSelectSchema: (schema: MainSchema) => void;
}

export const LayoutVendorNavbar: React.FC<LayoutVendorNavbarProps> = ({ schemas, selectedSchema, onSelectSchema }) => {

    return (
        <>
            {/* {!hasAcceptedTerms && (
                <Alert severity="warning" className="mb-4">
                Please complete and submit the Terms &amp; Conditions before filling out the remaining vendor information.
                </Alert>
            )} */}
            <Card className="mb-6">
                <Tabs
                    value={selectedSchema?.id}
                    onChange={(event, value) => {
                        const schema = schemas.find((s) => s.id === value)
                        if (schema) {
                            onSelectSchema(schema)
                        }
                    }}
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="vendor profile tabs"
                    sx={{ borderBottom: 1, borderColor: 'divider' }}
                >
                    {schemas.map((schema) => (
                        <Tab
                            key={schema.id}
                            label={schema.title}
                            value={schema.id}
                            icon={<i className={`${schema.icon} text-lg`} />}
                            iconPosition="start"
                            sx={{ minHeight: 64, px: 4 }}
                            // disabled={!hasAcceptedTerms && tab.id !== 'terms_conditions'}
                        />
                    ))}
                </Tabs>
            </Card>
        </>
    )
};
