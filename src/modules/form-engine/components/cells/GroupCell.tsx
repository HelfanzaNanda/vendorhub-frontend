import { Box, Typography, TypographyVariant } from "@mui/material";

interface GroupCellProps {
    title?: string;
    items: Array<
        string |
        {
            label?: string;
            value: React.ReactNode;
            variant?: TypographyVariant;
        }
    >;
}

export function GroupCell({ title, items, }: GroupCellProps) {
    return (
        <Box flex={1}>
            {title ? <Typography variant="caption" fontWeight={700} > {title} </Typography> : null}

            {items.map((item, index) => {
                if (typeof item === 'string') {
                    return (
                        <Typography key={index} variant="body2" >
                            {item}
                        </Typography>
                    );
                }

                return (
                    <Typography key={index} variant={item.variant ?? "body2"} >
                        {item.label ? <strong>{item.label}:</strong> : null}
                        {item.value}
                    </Typography>
                );
            })}
        </Box>
    );
}
