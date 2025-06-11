// components/ui/ExampleClientComponent.tsx
'use client'

import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
// import { useCallback } from "react" // Not used, can remove
import { createQueryString } from "@/utils/createQueryingString"

export default function ExampleClientComponent() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams() // This hook triggers the Suspense requirement

  return (
    <>
      <p>Sort By</p>

      {/* using useRouter */}
      <button
        onClick={() => {
          router.push(pathname + '?' + createQueryString(searchParams,'sort', 'asc'))
        }}
      >
        ASC
      </button>

      {/* using <Link> */}
      <Link
        href={
          pathname + '?' + createQueryString(searchParams,'sort', 'desc')
        }
      >
        DESC
      </Link>
    </>
  )
}

// utils/createQueryString.ts (or wherever you put it)
// This utility function does NOT use hooks, so it can be used anywhere.
