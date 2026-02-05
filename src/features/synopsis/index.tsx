import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { Bot, Copy, X } from 'lucide-react'
import { columns } from './components/synopsis-columns'
import { SynopsisTable } from './components/synopsis-table'
import SynopsisProvider from './context/synopsis-context'
import { useApprovals } from './hooks/use-approvals'

export default function Synopsis() {
  const { approvals, addComment, resolveApproval } = useApprovals()

  return (
    <SynopsisProvider>
      <Header fixed>
        <h1 className='text-base font-semibold'>
          Section Details: Synopsis of House Bill 1
        </h1>
        <div className='ml-auto flex items-center gap-2'>
          <Button variant='outline' size='sm' className='gap-2'>
            <Bot className='h-4 w-4' />
            AI Assistant
          </Button>
          <Button variant='outline' size='sm' className='gap-2'>
            <Copy className='h-4 w-4' />
            Copy
          </Button>
          <Button size='sm' className='gap-2'>
            Save
          </Button>
          <Button variant='ghost' size='icon' className='h-8 w-8'>
            <X className='h-4 w-4' />
          </Button>
        </div>
      </Header>

      <Main>
        <div className='mb-4'>
          <label className='mb-2 block text-sm text-muted-foreground'>
            Section Summary
          </label>
          <Textarea
            className='min-h-[120px] resize-y'
            rows={6}
            placeholder='Enter section summary...'
          />
        </div>

        <Tabs defaultValue='approvals' className='space-y-4'>
          <div className='w-full overflow-x-auto pb-2'>
            <TabsList>
              <TabsTrigger value='references'>References</TabsTrigger>
              <TabsTrigger value='compare'>Compare Bills</TabsTrigger>
              <TabsTrigger value='comments'>Comments (2)</TabsTrigger>
              <TabsTrigger value='approvals'>Approvals (4)</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value='references' className='mt-4'>
            <p className='text-muted-foreground'>
              References content will go here.
            </p>
          </TabsContent>

          <TabsContent value='compare' className='mt-4'>
            <p className='text-muted-foreground'>
              Compare Bills content will go here.
            </p>
          </TabsContent>

          <TabsContent value='comments' className='mt-4'>
            <p className='text-muted-foreground'>
              Comments content will go here.
            </p>
          </TabsContent>

          <TabsContent value='approvals' className='mt-4 space-y-4'>
            <SynopsisTable 
              data={approvals} 
              columns={columns}
              onAddComment={addComment}
              onResolve={resolveApproval}
            />

            <div className='flex flex-wrap items-center gap-2'>
              <Input
                placeholder='Tag a Member to Send Approval Email'
                className='flex-1'
              />
              <Button>Request Approval</Button>
            </div>
          </TabsContent>
        </Tabs>
      </Main>
    </SynopsisProvider>
  )
}
