'use client';

import React from 'react';

import {
    TextField,
    InputAdornment
} from '@mui/material';

interface TreeSearchProps {
    value: string;
    onChange: (value: string) => void;
}

export const TreeSearch: React.FC<TreeSearchProps> = ({
    value,
    onChange
}) => {

    return (

        <TextField

            fullWidth

            size="small"

            placeholder="Search..."

            value={value}

            onChange={(e) => onChange(e.target.value)}

            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <i className="ri-search-line" />
                    </InputAdornment>
                )
            }}

        />

    );

};
