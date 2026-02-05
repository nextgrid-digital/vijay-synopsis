import type { ApprovalStatus } from './schema'

export const approvalStatusTypes = new Map<ApprovalStatus, string>([
  [
    'awaiting_approval',
    'bg-blue-50 text-blue-700 border-blue-200',
  ],
  ['approved', 'bg-green-600 text-white border-green-600'],
])

export const approvalStatusLabels: Record<ApprovalStatus, string> = {
  awaiting_approval: 'Awaiting Approval',
  approved: 'Approved',
}
