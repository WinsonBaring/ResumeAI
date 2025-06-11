'use client'

import { JOB_DESCRIPTION } from "@/const/variables"
import { useActionState, useEffect, useRef } from "react" // Added useEffect and useRef
import { createWorkExperience } from "@/api/actions/create-work-experience"

// Shadcn UI components
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea" // Often better for descriptions
import { toast } from "sonner" // Using sonner's toast
import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover"
import { createResume } from "@/api/actions/create-resume"

export  function CreateResume() {
    // Initialize state to match what your server action returns on success/failure
    const [state, formAction, isPending] = useActionState(createResume, null);


    // Effect to handle server action outcomes (success or errors)
    useEffect(() => {
        // Handle success notification and form reset
        if (state?.result) {
            toast.success("resume created successfully!"); // Sonner success toast
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


        <form
            className="flex flex-col justify-center space-y-3"
            action={formAction} // Connect the form to the server action
        // className="space-y-6 p-8 border rounded-lg shadow-xl bg-white max-w-md mx-auto my-10" // Nice styling
        >
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Create Resume</h2>

            <div className="space-y-2">
                <Label htmlFor="title" className="text-base font-medium text-gray-700">
                    Title
                </Label>
                <Input // Using Textarea for multi-line description
                    id="title"
                    name="title"
                    disabled={isPending}
                    placeholder="Video Editor"
                />
                <Label htmlFor="description" className="text-base font-medium text-gray-700">
                    Description
                </Label>
                <Input // Using Textarea for multi-line description
                    id="description"
                    name="description"
                    disabled={isPending}
                    placeholder="Creating scripts, Editing Videos, Providing Values"
                />
            </div>

            <Button
                type="submit"
                disabled={isPending} // Disable button while action is pending
                className="items-end"
            // className="w-full text-lg py-3" // Make button full width and slightly larger
            >
                {isPending ? "Creating..." : "Create Resume"}
            </Button>

            {/*k
                // THIS SECTION IS INTENTIONALLY REMOVED.
                // It was trying to call `toast(error)` directly in JSX, which is incorrect.
                // Errors are now handled by `toast` notifications within the `useEffect` hook.
            */}
        </form>

    );
}