
import { Suspense } from "react";
import VerifyPage from "./Verify";

export default function Page() {
  return (
    <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
      <VerifyPage />
    </Suspense>
  )
}
