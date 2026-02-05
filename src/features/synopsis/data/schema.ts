import { z } from 'zod'

export const commentSchema = z.object({
  id: z.string(),
  author: z.string(),
  content: z.string(),
  timestamp: z.string(),
})

export const approvalSchema = z.object({
  id: z.string(),
  approverName: z.string(),
  sectionTitle: z.string(),
  status: z.enum(['awaiting_approval', 'approved']),
  commentCount: z.number(),
  comments: z.array(commentSchema).optional(),
})

export type Comment = z.infer<typeof commentSchema>
export type Approval = z.infer<typeof approvalSchema>
export type ApprovalStatus = Approval['status']

export const approvalListSchema = z.array(approvalSchema)
export type ApprovalList = z.infer<typeof approvalListSchema>
