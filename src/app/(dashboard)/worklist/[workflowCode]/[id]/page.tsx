'use client'

import { Suspense } from 'react'
import { useParams } from 'next/navigation'
import WorklistDetail from '@/modules/worklists/components/WorklistDetail'

export default function WorklistDetailPage() {
  const params = useParams()
  const id = params.id as string

  return (
    <Suspense fallback={<div className="p-8 text-center"><i className="ri-loader-4-line animate-spin text-4xl" /></div>}>
      <WorklistDetail workflowTransactionId={id} />
    </Suspense>
  )
}
