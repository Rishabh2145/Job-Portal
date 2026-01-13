
import { Suspense } from 'react'
import Verify from './Reset'

export default function Page() {
  return (
    <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
      <Verify />
    </Suspense>
  )
}
