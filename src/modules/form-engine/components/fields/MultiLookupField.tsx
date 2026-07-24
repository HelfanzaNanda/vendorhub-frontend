'use client';

import React, { useMemo } from 'react';
import {
    Box,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';

import { useDynamicFormContext } from '../../context';
import { AutocompleteField } from './AutocompleteField';
import type { BaseFieldProps } from './types';
import { useMappingEffect } from '../../hooks';
import { DataTable, DataTableColumnHeader } from '@/components/common/DataTable';

export const MultiLookupField: React.FC<BaseFieldProps> = (props) => {

    const {
        value,
        onChange,
        field,
        error,
        isReadonly,
        isDisabled
    } = props;

    const context = useDynamicFormContext();
    
    const rows = Array.isArray(value) ? value : [];    

    useMappingEffect(field, rows);

    const handleSelect = (selected: any) => {
        if (!selected) return;
        const exists = rows.some(x => x.id === selected.id);
        if (exists) return;

        onChange([
            ...rows,
            selected
        ]);

    };

    const handleDelete = (id: number) => {
        onChange( rows.filter(x => x.id !== id) );
    };
    

    return (
        <Box>
            <AutocompleteField {...props} value={null} onChange={handleSelect} />
            <Paper variant="outlined" sx={{ mt: 2 }} >
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            {field.multiLookup?.columns?.map(col => <TableCell key={col.field}> {col.header} </TableCell>)}
                            <TableCell width={80} align="center" > Action </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            rows.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={(field.multiLookup?.columns?.length ?? 0) + 1} align="center" >
                                        <Typography variant="body2" color="text.secondary" >
                                            No data
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            )
                        }
                        {
                            rows.map((row, index) => (
                                <TableRow key={row.id ?? index} >
                                    {field.multiLookup?.columns?.map(col => <TableCell key={col.field}> {row[col.field]} </TableCell>)}
                                    <TableCell align="center">
                                        <IconButton color="error" size="small" disabled={isReadonly || isDisabled} onClick={() => handleDelete(row.id)} >
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </Paper>
        </Box>
    );
};
