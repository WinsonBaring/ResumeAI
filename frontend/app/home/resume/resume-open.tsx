// app\home\resume\resume-open.tsx
'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
// import { useRouter } from 'next/router' // Remove this
import { usePathname, useRouter } from 'next/navigation' // <-- Use this instead!
import { useSearchParams } from 'next/navigation'
import { TableCell } from '@/components/ui/table'
import { createQueryString } from '@/utils/createQueryingString'
import { RESUME_ID } from '@/const/variables'

type iResumeOpen = {
    id:number 
}
export const ResumeOpen = ({ id }: iResumeOpen) => {

    const params = useSearchParams();
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const router = useRouter();
    return (
        // You had <ResumeOpen /> being placed directly in the TableRow.
        // Table components usually require specific children (like TableCell)
        // You need to wrap your content in a TableCell.
        <TableCell>
            <Button
                variant={"link"}
                onClick={() => {
                    // The push method is slightly different in next/navigation
                    // For dynamic routes like `resume/[id]`, you just push the path.
                    // router.push(pathname + '?' + createQueryString(searchParams, RESUME_ID, id.toString() ))
                    router.push('resume')

                }}
            >
                Open
            </Button>
        </TableCell>
    )
}