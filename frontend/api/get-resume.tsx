// 'use server'
import { JOB_DESCRIPTION, RESUME } from '@/const/variables';
import { Database } from '@/utils/supabase/database.types'; // Adjust path if necessary
import { auth } from "@clerk/nextjs/server";

// Define the expected type for a single row from the job_description table
type ResumeRow = Database['public']['Tables']['Resume']['Row']; // Assuming 'Job Description' is the correct key

// Define the return type for your function
type GetResumeResult = {
    data: ResumeRow[] | null;
    error: string | null;
};

export const getResume = async (): Promise<GetResumeResult> => {
    try {
        const session = auth();
        const token = await (await session).getToken();
        // console.log("this is the token",token);

        // Check if token is available
        if (!token) {
            console.warn("No authentication token found for get resume.");
            // Return null data and an error message for unauthenticated case
            return { data: null, error: "Authentication required." };
        }

        const response: Response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/${RESUME}?select=*`, {
            headers: {
                "apikey": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
                "Authorization": `Bearer ${token}`
            },
            // RECOMMENDED FOR USER-SPECIFIC DATA:

            cache: "force-cache",
            // If the data is truly public/same for all users (no RLS based on token),
            // and the token is a generic public/anon key that doesn't change query results,
            // then you *could* use:
            // cache: "force-cache",
            
            next: { 
                revalidate: 3600, 
                tags:[RESUME]
            },
            // But be very sure it's not user-specific.
        });

        // Check if the request was successful
        if (!response.ok) {
            const errorText = await response.text();
            const errorMessage = `Failed to fetch resume: ${response.status} - ${errorText}`;
            console.error(errorMessage);
            // Return null data and the error message
            return { data: null, error: errorMessage };
        }

        // Await the JSON data and type it
        const data: ResumeRow[] = await response.json();
        return { data, error: null };

    } catch (e: any) {
        // Catch any network errors or other unexpected errors
        const errorMessage = `An unexpected error occurred: ${e.message || 'Unknown error'}`;
        console.error(errorMessage, e);
        return { data: null, error: errorMessage };
    }
};