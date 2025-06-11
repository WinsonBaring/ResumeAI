'use client'
import { editJobDescription } from "@/api/actions/edit-job-description"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useActionState } from "react"

interface IEditJobDescription{
    description:string
}
export function EditJobDescription({description}:IEditJobDescription) {

    const [state, formAction, loading] = useActionState(editJobDescription, null);
    return (
        <Popover >
            <PopoverTrigger asChild>
                <Button variant="outline">Edit</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 "
            
            align="center"
            side="bottom"
            sideOffset={10}
            >
                <form action={formAction}>
                    <input type="text" defaultValue={description} name="description" id="" />
                </form>
                <Button
                    type="submit"
                    disabled={loading} // Disable button while loading
                >
                    {loading ? "Saving..." : "Save Changes"}

                </Button>
            </PopoverContent>
        </Popover>
    )
}
