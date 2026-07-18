import React from 'react';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button, Box, Typography } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';

interface ColumnDef {
  header: string;
  renderCell: (index: number) => React.ReactNode;
}

interface TableRendererProps {
  title?: string;
  columns: ColumnDef[];
  rowCount: number;
  onAdd?: () => void;
  onRemove?: (index: number) => void;
  readonly?: boolean;
}

export const TableRenderer: React.FC<TableRendererProps> = ({ title, columns, rowCount, onAdd, onRemove, readonly }) => {
  return (
    <Box mb={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
        <Typography variant="h6">{title || 'Table'}</Typography>
        {!readonly && onAdd && (
          <Button startIcon={<Add />} onClick={onAdd} variant="outlined" size="small">
            Add Row
          </Button>
        )}
      </Box>
      
      <TableContainer component={Paper} variant="outlined">
        <Table size="small">
          <TableHead>
            <TableRow>
              {columns.map((col, idx) => (
                <TableCell key={idx} sx={{ fontWeight: 'bold' }}>{col.header}</TableCell>
              ))}
              {!readonly && onRemove && <TableCell align="right" sx={{ fontWeight: 'bold' }}>Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.from({ length: rowCount }).map((_, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((col, colIndex) => (
                  <TableCell key={colIndex} sx={{ verticalAlign: 'top', pt: 2 }}>
                    {col.renderCell(rowIndex)}
                  </TableCell>
                ))}
                {!readonly && onRemove && (
                  <TableCell align="right" sx={{ verticalAlign: 'top', pt: 2 }}>
                    <IconButton color="error" onClick={() => onRemove(rowIndex)} size="small">
                      <Delete fontSize="small" />
                    </IconButton>
                  </TableCell>
                )}
              </TableRow>
            ))}
            {rowCount === 0 && (
              <TableRow>
                <TableCell colSpan={columns.length + (onRemove && !readonly ? 1 : 0)} align="center" sx={{ py: 3 }}>
                  <Typography variant="body2" color="textSecondary">No data available.</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
