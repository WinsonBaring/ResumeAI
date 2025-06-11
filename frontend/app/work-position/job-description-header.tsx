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


export const JobDescriptionHeader = () => {
    return (
        <div className='flex flex-row w-[80%] p-4 gap-4  '>
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline">Create Job Description</Button>
                </PopoverTrigger>
                {/* <div
                className='w-[100%]'
                > */}
                <PopoverContent 
                // className="w-[100%] space-y-6 p-8 border rounded-lg shadow-xl bg-white max-w-md mx-auto my-10"
                // className='flex flex-col gap-4 w-[40%] '
                // className='flex flex-col gap-4 w-[40%] '
                align='start'
                sideOffset={10}
                >
                    <CreateJobDescription />
                </PopoverContent>
                {/* </div> */}
            </Popover>

        </div>
    )
}
