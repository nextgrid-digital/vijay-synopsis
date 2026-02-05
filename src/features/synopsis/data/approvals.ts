import type { Approval } from './schema'

const STORAGE_KEY = 'synopsis-approvals'

const defaultApprovals: Approval[] = [
  {
    id: '1',
    approverName: 'Ajay Jay',
    sectionTitle: 'Synopsis of HB1',
    status: 'awaiting_approval',
    commentCount: 0,
    comments: [],
  },
  {
    id: '2',
    approverName: 'John Smith',
    sectionTitle: 'Synopsis of HB1',
    status: 'approved',
    commentCount: 2,
    comments: [
      {
        id: '2-1',
        author: 'John Smith',
        content: 'Should we clarify the recurring vs non-recurring breakdown here?',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toLocaleString(),
      },
      {
        id: '2-2',
        author: 'Sarah Johnson',
        content: "Agreed. I'll add a table showing the breakdown.",
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toLocaleString(),
      },
    ],
  },
  {
    id: '3',
    approverName: 'Jaden Kori',
    sectionTitle: 'Synopsis of HB1',
    status: 'awaiting_approval',
    commentCount: 0,
    comments: [],
  },
  {
    id: '4',
    approverName: 'Patt K',
    sectionTitle: 'Synopsis of HB1',
    status: 'approved',
    commentCount: 2,
    comments: [
      {
        id: '4-1',
        author: 'Patt K',
        content: 'The summary is comprehensive. However, we might want to clarify the budget allocation section.',
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toLocaleString(),
      },
      {
        id: '4-2',
        author: 'Emily Davis',
        content: 'Great work on this synopsis! The structure is clear and easy to follow.',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toLocaleString(),
      },
    ],
  },
]

export function getApprovals(): Approval[] {
  if (typeof window === 'undefined') return defaultApprovals
  
  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultApprovals))
    return defaultApprovals
  }
  
  try {
    return JSON.parse(stored)
  } catch {
    return defaultApprovals
  }
}

export function saveApprovals(approvals: Approval[]): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(approvals))
}

export const approvals = getApprovals()
