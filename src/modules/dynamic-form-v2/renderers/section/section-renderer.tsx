import React from 'react';

import { LayoutRenderer } from '../layout';
import { FieldRenderer } from '../field';
import type { SectionRendererProps } from './section-renderer.interface';
import { FieldSchema } from '../../interfaces';

export const SectionRenderer: React.FC<SectionRendererProps> = React.memo(({ section }) => {
    const resolveFields = (fields: FieldSchema[]): FieldSchema[] => {
        const resolved = [...fields];

        let rowStart = 0;

        while (rowStart < resolved.length) {
            let rowWidth = 0;
            let autoIndex = -1;

            for (let i = rowStart; i < resolved.length; i++) {
                const width = resolved[i].grid?.md;

                if (width === 'AUTO') {
                    autoIndex = i;
                    continue;
                }

                if ((rowWidth + Number(width)) > 12) {
                    break;
                }

                rowWidth += Number(width);
            }

            if (autoIndex >= 0) {
                resolved[autoIndex] = {
                    ...resolved[autoIndex],
                    grid: {
                        ...resolved[autoIndex].grid,
                        md: 12 - rowWidth
                    }
                };
            }

            rowStart++;

            while (
                rowStart < resolved.length &&
                resolved
                    .slice(0, rowStart)
                    .reduce((a, b) => a + Number(b.grid?.md ?? 12), 0) % 12 !== 0
            ) {
                rowStart++;
            }
        }

        return resolved;
    };
    const fields = React.useMemo(
        () => resolveFields(section.fields),
        [section.fields]
    );
    return (
        <LayoutRenderer
            layout={section.layout}
            title={section.title}
            description={section.description}>
                {fields.map(field => <FieldRenderer key={field.id} field={field} />)}
        </LayoutRenderer>
    );
});

SectionRenderer.displayName = 'SectionRenderer';
