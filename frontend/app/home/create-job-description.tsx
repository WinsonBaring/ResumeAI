'use client'

import { JOB_DESCRIPTION } from "@/const/variables" // Assuming this is your Supabase table name
// import { createClient } from "@/utils/supabase/client" // Your utility to create a Supabase client
import { useActionState, useState } from "react"

import { createJobDescription } from "@/api/actions/createJobDescription"
import { useAuth } from "@clerk/nextjs"


export default function CreateJobDescription() {

    const [state, formAction, loading] = useActionState(createJobDescription, null);
    return (
        <form action={formAction} className="">
            <h2 className="text-xl font-semibold">Create Job Description</h2>
            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Job Description:
                </label>
                <input
                    type="text"
                    id="description"
                    name="description"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    disabled={loading} // Disable input while loading
                    placeholder="e.g., Senior Software Engineer for AI team"
                />
            </div>
            <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading} // Disable button while loading
            >
                {loading ? "Creating..." : "Create Job Description"}
            </button>
            {/* {JSON.stringify(state)} */}
            <div className="flex flex-col gap-4">

                {state?.error?.map((error: string, index: number) => {
                    return (

                        <div key={index}>
                            {error}
                        </div>
                    )
                })}
            </div>


        </form>
    )
}