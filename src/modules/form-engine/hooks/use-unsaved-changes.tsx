'use client'

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import ConfirmDialog from '@/components/shared/ConfirmDialog';

interface UnsavedChangesContextValue {
    isDirty: boolean;
    setIsDirty: (dirty: boolean) => void;
    registerSaveCallback: (cb: () => Promise<boolean>) => void;
    checkUnsavedChanges: (action: () => void) => void;
}

const UnsavedChangesContext = createContext<UnsavedChangesContextValue | undefined>(undefined);

export const useUnsavedChanges = () => {
    const context = useContext(UnsavedChangesContext);
    if (!context) {
        return {
            isDirty: false,
            setIsDirty: () => {},
            registerSaveCallback: () => {},
            checkUnsavedChanges: (action: () => void) => action()
        };
    }
    return context;
};

export const UnsavedChangesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isDirty, setIsDirty] = useState(false);
    const [saveCallback, setSaveCallback] = useState<(() => Promise<boolean>) | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    
    const [dialogOpen, setDialogOpen] = useState(false);
    const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

    // Handle Browser Refresh / Close
    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (isDirty) {
                e.preventDefault();
                e.returnValue = ''; // Standard way to show native browser warning
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [isDirty]);

    const registerSaveCallback = useCallback((cb: () => Promise<boolean>) => {
        setSaveCallback(() => cb);
    }, []);

    const checkUnsavedChanges = useCallback((action: () => void) => {
        if (isDirty) {
            setPendingAction(() => action);
            setDialogOpen(true);
        } else {
            action();
        }
    }, [isDirty]);

    const handleSaveAndContinue = async () => {
        if (!saveCallback) return;
        setIsSaving(true);
        try {
            const success = await saveCallback();
            if (success) {
                setIsDirty(false);
                setDialogOpen(false);
                if (pendingAction) {
                    pendingAction();
                }
                setPendingAction(null);
            }
        } finally {
            setIsSaving(false);
        }
    };

    const handleStay = () => {
        setDialogOpen(false);
        setPendingAction(null);
    };

    return (
        <UnsavedChangesContext.Provider value={{ isDirty, setIsDirty, registerSaveCallback, checkUnsavedChanges }}>
            {children}
            <ConfirmDialog
                open={dialogOpen}
                title="Unsaved Changes"
                message="You have unsaved changes. Would you like to save your changes before leaving this page?"
                onConfirm={handleSaveAndContinue}
                onClose={handleStay}
                isLoading={isSaving}
                confirmColor="primary"
                cancelLabel="Cancel"
                confirmLabel="Save & Continue"
            />
        </UnsavedChangesContext.Provider>
    );
};
