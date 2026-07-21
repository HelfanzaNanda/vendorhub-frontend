'use client';

import React, { useState } from 'react';

import {
    Box,
    Collapse,
    IconButton,
    List,
    ListItemButton,
    ListItemText,
    Popover,
    Radio
} from '@mui/material';

import { TreeSearch } from './TreeSearch';
import { TreeNode } from '@/modules/dynamic-form-v2/interfaces';
import { TreeEngine } from '@/modules/dynamic-form-v2/engines';


interface Props {
    open: boolean;
    anchorEl: HTMLElement | null;
    value: number | string | null;
    tree: TreeNode[];
    onClose: () => void;
    onSelect: (node: TreeNode) => void;
}

export const TreePopover: React.FC<Props> = ({
    open, anchorEl, value, tree, onClose, onSelect
}) => {
    const [keyword, setKeyword] = useState('');
    const [expanded, setExpanded] = useState<Record<number | string, boolean>>({});
    const filtered = TreeEngine.filter( tree, keyword );

    const toggle = (id: number | string) => {
        setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const renderNodes = (nodes: TreeNode[], level = 0) => {
        return nodes.map(node => {
            const hasChildren = node.children && node.children.length > 0;
            const isExpanded = expanded[node.id];

            return (
                <React.Fragment key={node.id}>
                    <ListItemButton
                        sx={{ pl: 2 + level * 3 }}
                        onClick={() => {
                            if (node.selectable) {
                                onSelect(node);
                                onClose();
                            } else if (hasChildren) {
                                toggle(node.id);
                            }
                        }}
                    >
                        {
                            hasChildren
                                ? (   
                                    <IconButton size="small" onClick={(e) => {
                                            e.stopPropagation();
                                            toggle(node.id);
                                        }}>
                                        <i className={ isExpanded ? 'ri-arrow-down-s-line' : 'ri-arrow-right-s-line' } />
                                    </IconButton>
                                )
                                : (
                                    <Box width={40} />
                                )

                        }

                        {

                            node.selectable && (
                                <Radio
                                    checked={value === node.id}
                                    size="small"
                                />
                            )
                        }

                        <ListItemText primary={node.label}
                            primaryTypographyProps={{
                                fontWeight: node.selectable ? 400 : 600
                            }}
                        />
                    </ListItemButton>
                    {
                        hasChildren && (
                            <Collapse in={isExpanded} timeout="auto" >
                                <List disablePadding>
                                    {   renderNodes(node.children!, level + 1) }
                                </List>
                            </Collapse>
                        )
                    }
                </React.Fragment>
            );
        });
    };

    return (
        <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={onClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            slotProps={{
                paper: {
                    sx: {
                        width: anchorEl?.clientWidth,
                        maxHeight: 450,
                        display: 'flex',
                        flexDirection: 'column'
                    }
                }
            }}>
            <Box p={2} borderBottom={1} borderColor="divider">
                <TreeSearch
                    value={keyword}
                    onChange={setKeyword}
                />
            </Box>
            <List disablePadding>
                {renderNodes(filtered)}
            </List>
        </Popover>
    );

};
