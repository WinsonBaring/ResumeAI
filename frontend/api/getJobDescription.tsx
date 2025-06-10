import { JOB_DESCRIPTION } from '@/const/variables';
import { Database } from '@/utils/supabase/database.types';
import { auth } from "@clerk/nextjs/server";
// headers and cookies are not directly used here but their presence in a file
// would also opt out of caching, and getToken() implicitly uses them.
// import { cookies, headers } from 'next/headers';

// Define the expected type for a single row from the job_description table
// Adjust 'job_description' to match the actual key in your Database['public']['Tables']
type JobDescriptionRow = Database['public']['Tables']['Job Description']['Row'];

export const getJobDescription= async () => {
    // Getting the token on the server
    // Note: auth() implicitly uses headers() or cookies()
    const session = auth();
    const token = await (await session).getToken();

    // Check if token is available
    if (!token) {
        // Handle unauthenticated case, e.g., throw an error, return empty array, redirect
        console.warn("No authentication token found for useJobDescription.");
        return []; // Or throw new Error("Authentication required");
    }

    // Correctly type the result of the fetch call as a standard Response object
    const response: Response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/${JOB_DESCRIPTION}?select=*`, {
        headers: {
            "apikey": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            "Authorization": `Bearer ${token}`
        },
        // IMPORTANT: For user-specific, authenticated data, use 'no-store'
        // This ensures the data is always fresh for the requesting user
        cache: "force-cache"
        // revalidate and tags are not applicable with 'no-store'
        // next: { revalidate: 3600 }, // Remove this line
    });

    // Check if the request was successful
    if (!response.ok) {
        const errorText = await response.text();
        console.error(`Failed to fetch job descriptions: ${response.status} - ${errorText}`);
        // Consider more specific error handling based on status codes (e.g., 401, 403)
        throw new Error(`Failed to fetch job descriptions: ${response.statusText}`);
    }

    // Await the JSON data and type it to the expected array of JobDescriptionRow
    const data: JobDescriptionRow[] = await response.json();
    return data;
};