import React, { useState } from 'react'

interface SynopsisContextType {
  expandedRowId: string | null
  setExpandedRowId: React.Dispatch<React.SetStateAction<string | null>>
}

const SynopsisContext = React.createContext<SynopsisContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export default function SynopsisProvider({ children }: Props) {
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null)

  return (
    <SynopsisContext value={{ expandedRowId, setExpandedRowId }}>
      {children}
    </SynopsisContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useSynopsis = () => {
  const synopsisContext = React.useContext(SynopsisContext)

  if (!synopsisContext) {
    throw new Error('useSynopsis has to be used within <SynopsisContext>')
  }

  return synopsisContext
}
