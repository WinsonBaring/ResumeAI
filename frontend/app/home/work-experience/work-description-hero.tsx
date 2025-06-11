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

// import { createJobDescription } from "@/api/actions/createJobDescription";
import CreateJobDescription from "@/app/work-position/create-job-description"
import { JOB_DESCRIPTION } from "@/const/variables";
import { WorkExperienceList} from "@/app/home/work-experience/work-description-list"
import {WorkExperienceHeader} from "@/app/home/work-experience/work-description-header"

export async function WorkExperienceHero() {

    // const supabase = await  createClient()

    // const {data,error}= await  supabase.from(JOB_DESCRIPTION).select();
    return (
        <Card>
            {/* {JSON.stringify(data)} */}
            {/* {info.} */}
            {/* <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card Description</CardDescription>
                <CardAction>Card Action</CardAction>
            </CardHeader> */}



            

            <WorkExperienceHeader/>

            <WorkExperienceList />
            {/* <CardContent>

            </CardContent> */}
            {/* <CardFooter>
                <p>Card Footer</p>
            </CardFooter> */}
        </Card>
    )
}