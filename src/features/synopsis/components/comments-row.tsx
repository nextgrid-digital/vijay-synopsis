import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import type { Comment } from '../data/schema'

interface CommentsRowProps {
  approvalId: string
  comments: Comment[]
  onAddComment: (approvalId: string, content: string) => void
  onResolve: (approvalId: string) => void
}

export function CommentsRow({ approvalId, comments, onAddComment, onResolve }: CommentsRowProps) {
  const [commentText, setCommentText] = useState('')

  const handlePostComment = () => {
    if (commentText.trim()) {
      onAddComment(approvalId, commentText.trim())
      setCommentText('')
    }
  }

  const handleResolve = () => {
    // Post comment first if there's text
    if (commentText.trim()) {
      onAddComment(approvalId, commentText.trim())
      setCommentText('')
    }
    // Then resolve
    onResolve(approvalId)
  }

  return (
    <tr>
      <td colSpan={5} className='p-0'>
        <div className='border-t bg-muted/30 p-6'>
          <div className='space-y-4'>
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <div key={comment.id}>
                  <div className='space-y-2'>
                    <p className='text-sm text-muted-foreground'>
                      {comment.content}
                    </p>
                    <div className='flex items-center gap-2 text-xs text-muted-foreground'>
                      <span className='font-medium text-foreground'>
                        {comment.author}
                      </span>
                      <span>{comment.timestamp}</span>
                    </div>
                  </div>
                  {index < comments.length - 1 && <Separator className='my-4' />}
                </div>
              ))
            ) : (
              <p className='text-sm text-muted-foreground'>No comments yet.</p>
            )}

            {comments.length > 0 && <Separator className='my-4' />}

            <div className='flex items-start gap-3'>
              <Textarea
                placeholder='Add a comment'
                className='min-h-[80px] flex-1 resize-none'
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                    e.preventDefault()
                    handlePostComment()
                  }
                }}
              />
              <div className='flex flex-col gap-2'>
                <Button 
                  variant='default' 
                  size='sm'
                  onClick={handlePostComment}
                  disabled={!commentText.trim()}
                >
                  Post Comment
                </Button>
                <Button 
                  variant='outline' 
                  size='sm'
                  onClick={handleResolve}
                >
                  Resolve
                </Button>
              </div>
            </div>
          </div>
        </div>
      </td>
    </tr>
  )
}
