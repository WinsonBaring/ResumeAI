import {  getResume} from '@/api/get-resume';

// Assuming other imports are correct for your UI components
// import { buttonVariants } from '@/components/ui/button';
// import { cookies, headers } from 'next/headers';
// import { revalidateButton } from "@/api/actions/revalidate";
import React from 'react';
import {
    Table,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    TableBody, // Ensure TableBody is imported if used
} from "@/components/ui/table"; // Corrected import for TableBody if it's missing
import { ScrollArea } from "@/components/ui/scroll-area";
import { EditJobDescription } from '@/app/home/job-description/edit-job-description';


// import { Separator } from "@/components/ui/separator"; // Not used in the provided snippet

export const ResumeList= async () => {
    const { data, error } = await getResume();

    if (error) {
        return <p className="text-red-500">Failed to load resume: {error}</p>;
    }

    if (!data || data.length === 0) {
        return <p className="text-gray-500">No Resume found.</p>;
    }

    return (
        // The parent div needs a defined height for the child's percentage height to work.
        // For demonstration, I'm setting a fixed height here.
        // In a real app, this parent might be a flex container or have a height from a layout.
        <div className="space-y-4 h-[70vh] w-[96%] m-auto flex-col items-center justify-center border p-4 rounded-md"> {/* Added height/width for demonstration */}
            {/* The ScrollArea height and width are now percentage-based */}
            <ScrollArea className="h-[100%] w-[100%] rounded-md p-3 m-5">

                <Table>
                    <TableCaption>A list of your Resume</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Title</TableHead>
                            <TableHead>Description</TableHead>
                            {/* Add other TableHeads if needed */}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((resume) => ( // Renamed 'data' to 'job' for clarity in map
                            <TableRow key={resume.id}>
                                <TableCell className="font-medium">{resume.title}</TableCell>
                                <TableCell>{resume.description}</TableCell>

                                <TableCell>
                                    <EditJobDescription description={resume.description!}/>
                                </TableCell>
                                {/* Add other TableCells if needed */}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </ScrollArea>
            {/* Keeping ButtonTest outside the scroll area, adjust as needed */}
            {/* You had JSON.stringify(result) outside, I'm putting data here, adjust as needed */}
            {/* <pre className="mt-4 p-2 bg-gray-100 rounded-md text-xs">{JSON.stringify(data, null, 2)}</pre> */}
        </div>
    );
};