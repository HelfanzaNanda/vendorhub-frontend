import React from 'react';

import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, Button, Card, CardContent } from '@mui/material';

import { createPortal } from 'react-dom';

import { useDynamicFormContext } from '@/modules/dynamic-form-v2';

export const PayloadPreviewPortal: React.FC = () => {
    const context = useDynamicFormContext();
    const [target, setTarget] = React.useState<HTMLElement | null>(null);
    const [copied, setCopied] = React.useState(false);

    React.useEffect(() => {
        setTarget(document.getElementById('payload-preview-target'));
    }, []);

    if (!target) return null;

    const payload = context.buildPayload ? context.buildPayload() : context.values;

    const handleCopy = () => {
        navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownload = () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(payload, null, 2));
        const dlAnchorElem = document.createElement('a');

        dlAnchorElem.setAttribute("href", dataStr);
        dlAnchorElem.setAttribute("download", "payload.json");
        document.body.appendChild(dlAnchorElem);
        dlAnchorElem.click();
        document.body.removeChild(dlAnchorElem);
    };

    return createPortal(
        <Card sx={{ width: '100%', boxShadow: 1, display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
                <Accordion defaultExpanded elevation={0} disableGutters sx={{ m: 0 }}>
                    <AccordionSummary expandIcon={<span>▼</span>} sx={{ borderBottom: '1px solid', borderColor: 'divider' }}>
                        <Box>
                            <Typography variant="h6" sx={{ fontSize: '1.1rem' }}>Payload Preview</Typography>
                            <Typography variant="caption" color="text.secondary">Generated from current form state.</Typography>
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails sx={{ p: 2, bgcolor: (theme) => theme.palette.mode === 'dark' ? 'grey.900' : 'grey.100', color: 'text.primary', overflowX: 'auto', maxHeight: '70vh' }}>
                        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                            <Button size="small" variant="outlined" sx={{ borderColor: 'divider' }} onClick={handleCopy}>
                                {copied ? 'Copied!' : 'Copy JSON'}
                            </Button>
                            <Button size="small" variant="outlined" sx={{ borderColor: 'divider' }} onClick={handleDownload}>
                                Download JSON
                            </Button>
                        </Box>
                        <pre style={{ margin: 0, fontSize: '0.85rem', fontFamily: 'monospace' }}>
                            {JSON.stringify(payload, null, 2) || '{}'}
                        </pre>
                    </AccordionDetails>
                </Accordion>
            </CardContent>
        </Card>,
        target
    );
};
