'use client'
import { deleteJobDescription } from "@/api/actions/delete-job-description"
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Trash2 } from "lucide-react"
import { useActionState, useEffect } from "react"
import { toast } from "sonner"


export default function DeleteJobDescription({ jobId }: { jobId: number }) {
    const [state, formAction, isPending] = useActionState(deleteJobDescription, null)
        // Effect to handle server action outcomes (success or errors)
        useEffect(() => {
            // Handle success notification and form reset
            if (state?.result) {
                toast.success("Job description deleted successfully!"); // Sonner success toast
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
            <form action={formAction}>
                <DialogTrigger asChild>
                    <Button variant="outline">
                        <Trash2 className="h-3 w-3" />
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Job Description</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this job description?
                        </DialogDescription>
                    </DialogHeader>
                    <div>
                        <Input
                            type="hidden"
                            name="jobId"
                            value={jobId}
                        />
                    </div>
                    <Button type="submit" disabled={isPending}>
                        {isPending ? "Deleting..." : "Delete"}
                    </Button>
                </DialogContent>
            </form>
        </Dialog>

        // <Dialog>
        //     <DialogTrigger>Open</DialogTrigger>
        //     <form action={formAction}>
        //         <DialogContent>
        //             <DialogHeader>
        //                 <DialogTitle>Are you absolutely sure?</DialogTitle>
        //                 <DialogDescription>
        //                     This action cannot be undone. This will permanently delete your account
        //                     and remove your data from our servers.
        //                 </DialogDescription>
        //             </DialogHeader>
        //             <input type="hidden" name="jobId" value={jobId} />
        //             <Button variant="ghost" size="sm" className="gap-1 text-red-600 hover:text-red-700 hover:bg-red-50">
        //                 <Trash2 className="h-3 w-3" />
        //             </Button>
        //         </DialogContent>
        //     </form>
        // </Dialog>
    )
}