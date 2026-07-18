import React from 'react';

import { layoutRegistry } from '../registry';
import type { LayoutRendererProps } from './layout-renderer.interface';
import { FormLayout } from '../../enums';

export const LayoutRenderer: React.FC<LayoutRendererProps> = React.memo((props) => {
    const { layout, title, description, children, props: customProps } = props;

    const Layout = layoutRegistry[layout] as React.ElementType;
    if (!Layout) {
        throw new Error(
            `Layout not found.\nLayout:\n${layout}`
        );
    }

    return (
        <Layout
            title={title}
            description={description}
            props={customProps}
        >
            {children}
        </Layout>
    );
});

LayoutRenderer.displayName = 'LayoutRenderer';
