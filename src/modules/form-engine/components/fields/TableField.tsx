"use client"

import React, { useState, useMemo } from 'react';
import type { SortingState, RowSelectionState } from '@tanstack/react-table';
import { Box, Card, CardContent, Typography, Button, Dialog, DialogContent, DialogTitle, IconButton, Divider, CardActions } from '@mui/material';
import { toast } from 'sonner';

import { DataTable, DataTableColumnHeader, DataTableActions } from '@/components/common/DataTable';
import ConfirmDialog from '@/components/shared/ConfirmDialog';
import { FormRenderer } from '../../renderers/form';
import { useCrudTable, useDynamicForm } from '../../hooks';
import { DynamicFormProvider, useDynamicFormContext } from '../../context';
import { SchemaEngine } from '../../engines';
import type { BaseFieldProps } from './types';

// Import generic CRUD hook
import { FormSchema } from '../../interfaces';

const ModalFormInner: React.FC<{
    schema: FormSchema;
    initialValues: Record<string, unknown>;
    mode: 'CREATE' | 'EDIT' | 'VIEW';
    onSave: (data: any) => void;
    onCancel: () => void;
    isSaving: boolean;
}> = ({ schema, initialValues, mode, onSave, onCancel, isSaving }) => {
    const form = useDynamicForm({ schema, initialValues, mode, readonly: mode === 'VIEW' });

    const handleFormSubmit = async () => {
        const isValid = await form.validate();
        if (isValid) {
            onSave(form.buildPayload());
        }
    };

    return (
        <DynamicFormProvider value={form}>
            <Box className="flex flex-col h-full">
                <Box sx={{ p: 3, flexGrow: 1, overflow: 'auto' }}>
                    <FormRenderer schema={schema} />
                </Box>
                <Divider />
                <CardActions className="p-4 justify-between items-center gap-2 bg-gray-50 dark:bg-zinc-900/50 rounded-b-md">
                    <Box className="flex-grow" />
                    <Box className="flex gap-2">
                        <Button variant="outlined" color="secondary" onClick={onCancel} disabled={isSaving}>
                            {mode === 'VIEW' ? 'Close' : 'Cancel'}
                        </Button>
                        {mode !== 'VIEW' && (
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleFormSubmit}
                                disabled={isSaving}
                                startIcon={isSaving ? <i className="ri-loader-4-line animate-spin" /> : <i className="ri-save-line" />}
                            >
                                Save
                            </Button>
                        )}
                    </Box>
                </CardActions>
            </Box>
        </DynamicFormProvider>
    );
};

export const TableField: React.FC<BaseFieldProps> = ({ field }) => {
    const context = useDynamicFormContext();
    const tableConfig = field.table;

    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(field.table?.pageSize || 10);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

    const [modalOpen, setModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'CREATE' | 'EDIT' | 'VIEW'>('CREATE');
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [isDetailLoading, setIsDetailLoading] = useState(false);

    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<any>(null);

    const endpoint = useMemo(() => {
        if (!tableConfig) return '';
        let url = tableConfig.endpoint;
        const matches = url.match(/:[a-zA-Z]+/g);
        if (matches) {
            matches.forEach(m => {
                const key = m.substring(1);
                // if context doesn't have it directly, check values
                const val = context.getValue(key) || context.getValue('id') || context.getValue('vendorTempId') || '';
                url = url.replace(m, String(val));
            });
        }
        return url;
    }, [tableConfig, context]);

    const filters = useMemo(() => ({
        page,
        limit: pageSize,
        search: search || undefined,
        sortBy: sorting[0]?.id || undefined,
        sortDir: sorting[0]?.id ? (sorting[0].desc ? 'desc' : 'asc') : undefined,
    }), [page, pageSize, search, sorting]);

    const {
        rows,
        total,
        isLoading,
        isError,
        refetch,
        isFetching,
        createMutation,
        updateMutation,
        deleteMutation,
        isCreating,
        isUpdating,
        isDeleting,
        getDetail,
    } = useCrudTable<any>(endpoint, filters as any);

    const columns = useMemo(() => {
        if (!tableConfig) return [];
        const list: any[] = [];
        tableConfig.columns.forEach(col => {
            const fieldName = typeof col === 'string' ? col : col.field;
            const title = typeof col === 'string' ? col : col.title;
            const renderFn = typeof col !== 'string' ? col.render : undefined;
            const isSortable = typeof col !== 'string' && col.sortable !== undefined ? col.sortable : tableConfig.sortable !== false;

            list.push({
                accessorKey: fieldName,
                header: ({ column }: any) => <DataTableColumnHeader column={column} title={title} />,
                cell: renderFn ? renderFn : ({ getValue }: any) => {
                    const val = getValue();
                    if (val === undefined || val === null || val === '') return '-';
                    if (typeof val === 'object') return Array.isArray(val) ? val.length + ' items' : 'Object';
                    return String(val);
                },
                enableSorting: isSortable,
            });
        });

        if (tableConfig.actions && tableConfig.actions.length > 0) {
            list.push({
                id: 'actions',
                header: () => <div className="text-right pr-2">Actions</div>,
                cell: ({ row }: any) => (
                    <DataTableActions
                        onView={tableConfig.actions?.includes('view') ? () => handleOpenModal(row.original, 'VIEW') : undefined}
                        onEdit={tableConfig.actions?.includes('edit') && !context.readonly ? () => handleOpenModal(row.original, 'EDIT') : undefined}
                        onDelete={tableConfig.actions?.includes('delete') && !context.readonly ? () => {
                            setItemToDelete(row.original);
                            setDeleteConfirmOpen(true);
                        } : undefined}
                    />
                ),
                enableSorting: false,
                enableHiding: false,
            });
        }

        return list;
    }, [tableConfig, context.readonly]);

    if (!tableConfig) return <Typography color="error">Table config is missing.</Typography>;

    const handleOpenModal = async (row: any, mode: 'VIEW' | 'EDIT') => {
        try {
            setIsDetailLoading(true);
            
            const res = await getDetail(row.id, {
                source : row.source
            });
            if (res.data) {
                setSelectedItem(res.data);
                setModalMode(mode);
                setModalOpen(true);
            } else {
                toast.error('Failed to load details');
            }
        } catch (err: any) {
            toast.error(err?.response?.data?.message || 'Failed to load details');
        } finally {
            setIsDetailLoading(false);
        }
    };

    const handleSave = (data: any) => {
        
        if (modalMode === 'CREATE') {
            createMutation.mutate(data, {
                onSuccess: () => {
                    setModalOpen(false);
                    refetch();
                }
            });
        } else if (modalMode === 'EDIT' && selectedItem) {
            data.source = selectedItem.source;
            updateMutation.mutate({ id: selectedItem.id, data }, {
                onSuccess: () => {
                    setModalOpen(false);
                    setSelectedItem(null);
                    refetch();
                }
            });
        }
    };

    const handleDeleteConfirm = () => {
        if (itemToDelete) {
            deleteMutation.mutate({id : itemToDelete.id, data : {source : itemToDelete.source}} as any, {
                onSuccess: () => {
                    setDeleteConfirmOpen(false);
                    setItemToDelete(null);
                    refetch();
                }
            });
        }
    };

    return (
        <Box className="flex flex-col gap-4 mb-4">
            <Card>
                <CardContent className="flex flex-col gap-4">
                    <Box className="flex justify-between items-center flex-wrap gap-2">
                        <Box>
                            <Typography variant="h6" fontWeight="bold">{field.label}</Typography>
                            {Boolean(field.helperText) && (
                                <Typography variant="body2" color="text.secondary">{String(field.helperText)}</Typography>
                            )}
                        </Box>
                        {!context.readonly && tableConfig.actions?.includes('edit') && (
                            <Button
                                variant="contained"
                                startIcon={<i className="ri-add-line" />}
                                onClick={() => {
                                    setSelectedItem({});
                                    setModalMode('CREATE');
                                    setModalOpen(true);
                                }}
                            >
                                Add {field.label}
                            </Button>
                        )}
                    </Box>

                    <DataTable
                        data={rows}
                        columns={columns}
                        loading={isLoading || isFetching || isDetailLoading}
                        error={isError ? 'Failed to load records.' : undefined}
                        page={page}
                        pageSize={pageSize}
                        totalItems={total}
                        onPageChange={setPage}
                        onPageSizeChange={(size) => { setPageSize(size); setPage(1); }}
                        search={tableConfig.searchable ? search : undefined}
                        onSearch={tableConfig.searchable ? (val) => { setSearch(val); setPage(1); } : undefined}
                        sorting={sorting}
                        onSortingChange={setSorting}
                        rowSelection={rowSelection}
                        onRowSelectionChange={tableConfig.selectable ? setRowSelection : undefined}
                        onRefresh={() => refetch()}
                        getRowId={(row: any) => String(row.id)}
                    />
                </CardContent>
            </Card>

            {modalOpen && field.schema && (
                <Dialog
                    open={modalOpen}
                    onClose={() => !(isCreating || isUpdating) && setModalOpen(false)}
                    maxWidth="md"
                    fullWidth
                >
                    <DialogTitle className="flex justify-between items-center p-4">
                        <Typography component="span" variant="h6" fontWeight="bold">
                            {modalMode === 'CREATE' ? 'Add' : modalMode === 'EDIT' ? 'Edit' : 'View'} {field.label}
                        </Typography>
                        <IconButton onClick={() => setModalOpen(false)}>
                            <i className="ri-close-line" />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent className="p-0" sx={{ minHeight: '400px' }}>
                        <ModalFormInner
                            key={modalMode === 'CREATE' ? 'new' : String(selectedItem?.id)}
                            schema={field.schema}
                            mode={modalMode}
                            initialValues={selectedItem || {}}
                            onSave={handleSave}
                            onCancel={() => setModalOpen(false)}
                            isSaving={isCreating || isUpdating}
                        />
                    </DialogContent>
                </Dialog>
            )}

            <ConfirmDialog
                open={deleteConfirmOpen}
                title="Confirm Delete"
                message="Are you sure you want to delete this record? This action cannot be undone."
                onClose={() => setDeleteConfirmOpen(false)}
                onConfirm={handleDeleteConfirm}
                confirmColor="error"
                isLoading={isDeleting}
            />
        </Box>
    );
};

TableField.displayName = 'TableField';
