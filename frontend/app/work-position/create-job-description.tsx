'use client'

import { JOB_DESCRIPTION } from "@/const/variables"
import { useActionState, useEffect, useRef } from "react" // Added useEffect and useRef
import { createJobDescription } from "@/api/actions/create-job-description"

// Shadcn UI components
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea" // Often better for descriptions
import { toast } from "sonner" // Using sonner's toast
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { DialogContent, DialogFooter, DialogTrigger, Dialog, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog"
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu"
import { Plus } from "lucide-react"

export default function CreateJobDescription() {
    // Initialize state to match what your server action returns on success/failure
    const [state, formAction, isPending] = useActionState(createJobDescription, null);


    // Effect to handle server action outcomes (success or errors)
    useEffect(() => {
        // Handle success notification and form reset
        if (state?.result) {
            toast.success("Job description created successfully!"); // Sonner success toast
        }
        // Handle error notifications
        else if (state?.error && state.error.length > 0) {
            // Display each server-side error as a separate toast
            state.error.forEach((err: string) => {
                toast.error(err); // Sonner error toast
            });
            // Alternative: display all errors in one toast:
            // toast.error(`Errors: ${state.error.join('; ')}`);
        }
    }, [state]); // Dependencies: Re-run when 'state' changes

    return (
        <Dialog>
            <form
                className="flex flex-col gap-4 space-y-6"
                action={formAction} // Connect the form to the server action
            // className="space-y-6 p-8 border rounded-lg shadow-xl bg-white max-w-md mx-auto my-10" // Nice styling
            >
                <DialogTrigger asChild>
                    <Button variant="default" className="flex flex-row gap-2">
                        <Plus className="h-4 w-4" />
                        Add Job Description
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Create Job Description</DialogTitle>
                        <DialogDescription>
                            Create a new job description for a job position.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-2">
                        <Label htmlFor="description" className="text-base font-medium text-gray-700">
                            Job Description
                        </Label>
                        <Textarea // Using Textarea for multi-line description
                            id="description"
                            name="description"
                            rows={5} // Adjust rows as needed
                            disabled={isPending}
                            placeholder="e.g., Senior Software Engineer needed for a groundbreaking AI project. Must have experience with machine learning frameworks and large-scale data processing..."
                            className="col-span-2 h-auto resize-y min-h-[80px]" // <--- FIXED THIS LINE
                        />
                        <Label htmlFor="title" className="text-base font-medium text-gray-700"> Title </Label>
                        <Input
                            id="title"
                            name="title"
                            disabled={isPending}
                            placeholder="e.g., Senior Software Engineer"
                        />
                        <Label htmlFor="company" className="text-base font-medium text-gray-700"> Company </Label>
                        <Input
                            id="company"
                            name="company"
                            disabled={isPending}
                            placeholder="e.g., Google"
                        />
                        <Label htmlFor="isActive" className="text-base font-medium text-gray-700"> Currently Working Here?</Label>
                        <RadioGroup defaultValue="false" name="isActive">
                            <div className="flex items-center gap-3">
                                <RadioGroupItem value="false" id="r1" />
                                <Label htmlFor="r1">No</Label>
                            </div>

                            <div className="flex items-center gap-3">
                                <RadioGroupItem value="true" id="r2" />
                                <Label htmlFor="r2">Yes</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    <Button
                        type="submit"
                        disabled={isPending} // Disable button while action is pending
                    >
                        {isPending ? "Creating..." : "Create Job Description"}
                    </Button>

                </DialogContent>


                {/*
                // THIS SECTION IS INTENTIONALLY REMOVED.
                // It was trying to call `toast(error)` directly in JSX, which is incorrect.
                // Errors are now handled by `toast` notifications within the `useEffect` hook.
            */}
            </form>
        </Dialog>


    );
}