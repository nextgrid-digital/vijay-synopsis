import { ColumnDef } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Check, MessageSquare } from 'lucide-react'
import type { Approval } from '../data/schema'
import { approvalStatusTypes, approvalStatusLabels } from '../data/data'
import { useSynopsis } from '../context/synopsis-context'

export const columns: ColumnDef<Approval>[] = [
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const { status } = row.original
      const badgeColor = approvalStatusTypes.get(status)
      const label = approvalStatusLabels[status]
      return (
        <Badge 
          variant={status === 'approved' ? 'default' : 'outline'} 
          className={cn(badgeColor)}
        >
          {label}
        </Badge>
      )
    },
    enableSorting: false,
  },
  {
    accessorKey: 'approverName',
    header: 'Approver Name',
    cell: ({ row }) => (
      <div className='font-medium'>{row.getValue('approverName')}</div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: 'sectionTitle',
    header: 'Section Title',
    cell: ({ row }) => (
      <div className='text-muted-foreground'>
        {row.getValue('sectionTitle')}
      </div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: 'commentCount',
    header: 'Comments',
    cell: ({ row }) => {
      // Use the actual comments array length for dynamic count
      const count = row.original.comments?.length || 0
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { expandedRowId, setExpandedRowId } = useSynopsis()
      
      const isExpanded = expandedRowId === row.original.id
      
      const handleClick = () => {
        setExpandedRowId(isExpanded ? null : row.original.id)
      }

      if (count === 0) {
        return (
          <button
            onClick={handleClick}
            className='text-muted-foreground hover:text-foreground transition-colors'
          >
            + Add Comments
          </button>
        )
      }
      return (
        <button
          onClick={handleClick}
          className='inline-flex items-center gap-1.5 text-sm hover:text-foreground transition-colors'
        >
          <MessageSquare className='h-4 w-4 text-muted-foreground' />
          {count} {count === 1 ? 'Comment' : 'Comments'}
        </button>
      )
    },
    enableSorting: false,
  },
  {
    id: 'actions',
    header: '',
    cell: ({ row }) => {
      const { status } = row.original
      if (status !== 'awaiting_approval') return null
      return (
        <Button variant='outline' size='sm' className='gap-1.5'>
          <Check className='h-4 w-4' />
          Approve
        </Button>
      )
    },
    enableSorting: false,
  },
]
