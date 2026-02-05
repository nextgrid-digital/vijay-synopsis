import { useState, useEffect } from 'react'
import type { Approval, Comment } from '../data/schema'
import { getApprovals, saveApprovals } from '../data/approvals'

export function useApprovals() {
  const [approvals, setApprovals] = useState<Approval[]>([])

  useEffect(() => {
    setApprovals(getApprovals())
  }, [])

  const addComment = (approvalId: string, content: string, author: string = 'Current User') => {
    const newComment: Comment = {
      id: `${approvalId}-${Date.now()}`,
      author,
      content,
      timestamp: new Date().toLocaleString(),
    }

    const updatedApprovals = approvals.map((approval) => {
      if (approval.id === approvalId) {
        const updatedComments = [...(approval.comments || []), newComment]
        return {
          ...approval,
          comments: updatedComments,
          commentCount: updatedComments.length,
        }
      }
      return approval
    })

    setApprovals(updatedApprovals)
    saveApprovals(updatedApprovals)
  }

  const resolveApproval = (approvalId: string) => {
    const updatedApprovals = approvals.map((approval) => {
      if (approval.id === approvalId) {
        return {
          ...approval,
          status: 'approved' as const,
        }
      }
      return approval
    })

    setApprovals(updatedApprovals)
    saveApprovals(updatedApprovals)
  }

  return {
    approvals,
    addComment,
    resolveApproval,
  }
}
