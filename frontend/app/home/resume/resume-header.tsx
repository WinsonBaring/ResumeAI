import React from 'react'
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,

} from "@/components/ui/card"
import { useQuery } from '@tanstack/react-query'
import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
// import { createClient } from '@/utils/supabase/server';
import CreateJobDescription from "@/app/work-position/create-job-description"
import { CreateResume } from '@/app/home/resume/create-resume'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"



// This part (the div rendering ResumeHeader) is now at the beginning of the functional component's return
// if this file is a React component itself. If this is just a module defining components,
// then the structure below is a bit unusual without an outer component wrapping it.
// Assuming this is part of a larger component's render method, I'll place the definition at the end.

// If this entire file is meant to be a single React component, you'd typically have:
// export default function MyComponent() {
//   return (
//     <div className="flex flex-col">
//       <ResumeHeader />
//     </div>
//   );
// }
// And ResumeHeader would be defined inside or above this.

// For the requested change, I'll move the definition of ResumeHeader to the end of the file.

// Existing div that *uses* ResumeHeader (appears before its definition now)
// If this file itself is a component (e.g., HomePage.jsx), this would be inside its return.
// Since it's freestanding, I'm assuming it's meant to be within a parent component's render.
// The placement "start in the end" typically means the definition, not the usage.

// **Note**: A React component definition should typically be *before* where it's used,
// unless it's a default export and used in a different file, or defined within the scope
// of a parent component (which is less common for `export const` outside the parent).
// Moving `export const ResumeHeader` to the very end of the file makes it defined *after*
// where it's implicitly used here. This would cause an error like "ResumeHeader is not defined".

// I'll assume you meant the *definition* of ResumeHeader should be the last *export* in the file.
// If the goal is truly to make the *code block* of ResumeHeader be the last thing in the file,
// then you'd need to move the usage inside another component, or ensure it's not used before defined.

// Let's make the *definition* of `ResumeHeader` appear at the end, while keeping the structure valid.
// The provided code snippet is incomplete as a standalone React component file if it only contains
// imports and then immediately a `div` and a component definition.

// If this is *part* of a larger component like:
// export default function SomePage() {
//   return (
//     <>
//       <div className="flex flex-col">
//         <ResumeHeader />
//       </div>
//       {/* other content */}
//     </>
//   );
// }
// And ResumeHeader is defined *within the same file*.

// Given the structure, I will define `ResumeHeader` after the "usage" div.
// This will cause a runtime error in a typical React setup because it's used before definition.
// To avoid the error, I'll put the *usage* inside a dummy component, and put the *definition* at the end.
// If you just want the *text* of the definition to be at the end, without fixing the usage order:

/*
// This part is the "usage" that should now be "at the start of the file" (relative to its usage)
// I will wrap it in a placeholder component to make it valid for demonstration.
export const MyMainComponent = () => {
    return (
        <div className="flex flex-col">
            <ResumeHeader />
        </div>
    );
};
*/

// Original request: "make this start in the end" -- referring to the `ResumeHeader` definition.
// So, the `export const ResumeHeader = () => { ... }` block should be at the very end.

// To make this valid, I'll define a component that *uses* `ResumeHeader` first,
// and then the definition of `ResumeHeader` at the end.

// Let's assume the provided div is part of a default export component.
// I'll create a main component (`HomeView` as an example) that renders this.

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { AppBreadcrumbs } from './bread-crumbs'
// The definition of ResumeHeader is now at the very end of the file.
export const ResumeHeader = () => {
    return (
        // <div className='flex flex-row w-[80%] gap-4 items-end'>
        <div
            className='flex flex-row justify-between w-full h-full'
        >

            <div className='flex flex-row justify-center items-center'>
                {/* <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Resume</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb> */}
                <AppBreadcrumbs/>
            </div>
            <div
            >
                {/* <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline">Create Resume</Button>
                </PopoverTrigger>
                <PopoverContent
                    align='start'
                    sideOffset={10}
                >
                    <CreateResume />
                </PopoverContent>
            </Popover> */}
                <Dialog>

                    <DialogTrigger>
                        <Button
                            variant={'outline'}
                        >
                            Create Resume

                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        {/* <DialogHeader>
                        <DialogTitle></DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently delete your account
                            and remove your data from our servers.
                        </DialogDescription>
                    </DialogHeader> */}
                        <CreateResume />
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}