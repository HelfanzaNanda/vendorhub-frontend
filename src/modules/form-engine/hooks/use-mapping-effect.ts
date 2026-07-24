import { useEffect, useRef } from 'react';
import { useDynamicFormContext } from '../context';
import { FieldSchema } from '../interfaces';
import { ObjectUtil } from '../utils';

export const useMappingEffect = (field: FieldSchema, selectedNode: any | any[]) => {
    const context = useDynamicFormContext();
    const previousNodeRef = useRef<any>(null);

    useEffect(() => {
        if (!field.mapping || field.mapping.length === 0) return;
        if (selectedNode === undefined || selectedNode === null) return;
        
        // Skip if the node hasn't changed
        if (previousNodeRef.current === selectedNode) return;
        
        const isArray = Array.isArray(selectedNode);
        
        field.mapping.forEach(item => {
            const mappedValue = isArray 
                ? selectedNode.map(node => ObjectUtil.get(node, item.from))
                : ObjectUtil.get(selectedNode, item.from);
                
            const currentValue = context.getValue(item.to);
            
            // Only update if different
            if (JSON.stringify(currentValue) !== JSON.stringify(mappedValue)) {
                context.setValue(item.to, mappedValue);
            }
        });
        
        previousNodeRef.current = selectedNode;
    }, [selectedNode, field.mapping, context]);
};
