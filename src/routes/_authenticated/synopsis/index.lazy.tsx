import { createLazyFileRoute } from '@tanstack/react-router'
import Synopsis from '@/features/synopsis'

export const Route = createLazyFileRoute('/_authenticated/synopsis/')({
  component: Synopsis,
})
