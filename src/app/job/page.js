import { Suspense } from 'react'
import Job from './JobPage'

export default function Jobs() {
  return (
    <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
      <Job />
    </Suspense>
  )
}
