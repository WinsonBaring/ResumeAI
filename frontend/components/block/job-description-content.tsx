'use client'
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
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { createClient } from '@/utils/supabase/client';
import CreateJobDescription from "./create-job-description";
import useJobDescription from "@/hooks/use-job-description";


export function JobDescriptionHero() {
    const info = useJobDescription();
    

    // return <pre>{JSON.stringify(instruments, null, 2)}</pre>


    return (
        <Card>
            {/* {info.} */}
            <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card Description</CardDescription>
                <CardAction>Card Action</CardAction>
            </CardHeader>
            <CreateJobDescription/>
            <CardContent>
                {/* {data?.map((job)=>{
                    return(
                        <div>
                            {JSON.stringify(job,null,2)}
                        </div>
                    )
                })} */}

            </CardContent>
            <CardFooter>
                <p>Card Footer</p>
            </CardFooter>
        </Card>
    )
}