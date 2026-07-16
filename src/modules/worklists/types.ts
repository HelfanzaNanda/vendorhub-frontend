import type { WorkflowCode } from "./enums/workflow-code.enum"
import type { WorklistCard } from "./enums/worklist-card.enum"

export interface WorklistSummary {
  needMyReview: number
  inProgress: number
  completed: number
  rejected: number
  overSla: number
}

export interface WorklistFilters {
  workflowCode: WorkflowCode
  card: WorklistCard
  page: number
  limit: number
  search?: string
  sortBy?: string
  sortDir?: 'asc' | 'desc'
  [key: string]: any
}

export interface WorklistItem {
  requestNo: string
  vendorName: string
  workflow: string
  currentStep: string
  submittedBy: string
  submittedDate: string
  dueDate: string
  status: string
}

export interface PaginatedWorklist {
  data: WorklistItem[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface WorklistDetailData {
  workflowInfo: {
    workflowCode: string;
    workflowName: string;
    requestNo: string;
    workflow: string;
    status: string;
    submittedBy: string;
    submittedDate: string;
    currentStep: string;
    site: string;
    slaPic: string;
    vendorName: string;
    vendorType: string;
    dueDate: string;
  };
  approvers?: {
    user: { name: string };
    delegatedUser: { name: string } | null;
    role: string;
    actionAt: string;
    status: string;
    remarks: string | null;
  }[];
  reviewStatistics?: {
    changedSections: number;
    changedFields: number;
    created: number;
    updated: number;
    deleted: number;
    noChanges: number;
  };
  tabChanges?: Record<string, number>;
  permission: {
    canReview: boolean;
    canAction: boolean;
  };
  summary: {
    section: string;
    action: 'CREATE' | 'UPDATE' | 'DELETE' | 'NO CHANGE';
  }[];
  sections: {
    id: string;
    title: string;
    changes?: {
      field: string;
      current: string;
      new: string;
    }[];
    listData?: any[];
    review?: {
      status: 'OK' | 'NOT_OK' | null;
      remark: string | null;
    }
  }[];
  availableActions: string[];
}

export interface WorklistHistoryData {
  actor: string;
  action: string;
  actionAt: string;
  remarks: string;
}
