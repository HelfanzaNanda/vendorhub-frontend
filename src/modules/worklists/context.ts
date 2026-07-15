'use client'

import { createContext, useContext } from 'react'

export interface WorklistWorkflowInfo {
    workflowCode: string;
    workflowName: string;
    requestNo: string;
    vendorName: string;
    vendorType: string;
    site: string;
    currentStep: string;
    workflow: string;
    status: string;
    submittedBy: string;
    submittedDate: string;
    dueDate: string;
}

export interface WorklistApprover {
    workflowTransactionStepId : number;
    user: {
        name: string;
        email: string;
    };
    delegatedUser: {
        name: string;
        email: string;
    } | null;
    role: string;
    actionAt: string;
    status: string;
    remarks: string | null;
}

export interface WorklistReviewContextState {
  isReviewMode: boolean;
  worklistData?: {
    permissions?:{
      canSubmit?: boolean;
      canDelegate?: boolean;
      canReview?: boolean;
    };
    workflowInfo: WorklistWorkflowInfo;
    approvers: WorklistApprover[];
    reviewStatistics?: {
      changedSections: number;
      changedFields: number;
      created: number;
      updated: number;
      deleted: number;
      noChanges: number;
    };
    tabChanges?: Record<string, number>;
  };
  sectionChanges?: Record<string, { current: any; new: any }>;
  listChanges?: Record<string, { action: string; current: any; new: any }>;
  reviewValidation?: any;
  setReviewValidation?: (val: any) => void;
  activeTab?: number;
  setActiveTab?: (val: number) => void;
}


export interface DelegationUser {
    id: number
    firstname: string
    lastname: string
    email: string
    username: string
    site : {
        name : string
    }
}


export const WorklistReviewContext = createContext<WorklistReviewContextState>({
  isReviewMode: false,
  worklistData: undefined,
})

export const useWorklistReview = () => useContext(WorklistReviewContext)
