// 'use client'
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,

} from "@/components/ui/card"
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


export async function JobDescriptionHero() {
    const supabase = await createClient();
    const { data} = await supabase.from("Job Description").select();
    // return <pre>{JSON.stringify(instruments, null, 2)}</pre>

    return (
        <Card>
            <pre>
                {JSON.stringify(data,null,2)}
            </pre>
            {/* <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card Description</CardDescription>
                <CardAction>Card Action</CardAction>
            </CardHeader> */}
            <CardContent>

                <DropdownMenu>
                    <DropdownMenuTrigger>
                        Version
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>V10</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>V1</DropdownMenuItem>
                        <DropdownMenuItem>V2</DropdownMenuItem>
                        <DropdownMenuItem>V3</DropdownMenuItem>
                        <DropdownMenuItem>V4</DropdownMenuItem>
                        <DropdownMenuItem>V5</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>



            </CardContent>
            <CardFooter>
                <p>Card Footer</p>
            </CardFooter>
        </Card>
    )
}