'use client'

import { JOB_DESCRIPTION } from "@/const/variables" // Assuming this is your Supabase table name
import { createClient } from "@/utils/supabase/client" // Your utility to create a Supabase client
import { useState } from "react"
import { useAuth } from "@clerk/nextjs"

// Optional: Define a type for your job description table row if you have one
interface JobDescriptionRow {
  id: string; // Or number, depending on your table
  description: string;
  created_at: string; // Or Date
  user_id?: string; // If you link to a user ID
  // ... other columns
}

export default function CreateJobDescription() {
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<JobDescriptionRow[] | null>(null) // Assuming insert returns an array of rows
  const [loading, setLoading] = useState(false) // Add a loading state
  const { getToken } = useAuth()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Clear previous state and set loading
    setError(null)
    setData(null)
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const description = formData.get("description") as string

    if (!description) {
      setError("Job description cannot be empty.")
      setLoading(false)
      return
    }

    try {
      // 1. Get the Clerk session token
      // The template name 'resumeai' should match a template you've configured in Clerk Dashboard
      // (Settings -> JWT Templates). It's crucial for Supabase to verify the token.
      const token = await getToken({ template: "resumeai" })

      if (!token) {
        setError("Authentication token missing. Please log in.")
        return // Exit if no token
      }

      // 2. Create your Supabase client
      // This `createClient` utility should ideally get the Supabase URL and Anon Key from env variables.
      // It should NOT try to set headers with the token directly.
      const supabase = createClient(token) // No token passed here initially

      // 3. Sign in to Supabase using the Clerk JWT token
      // This is the critical step that tells Supabase to authenticate the session
      // with your Clerk token. For this to work:
      // a) You need a 'clerk' provider configured in your Supabase Auth Providers (e.g., as a Custom JWT provider).
      // b) The JWT secret in Supabase for this provider must match your Clerk JWT secret.


      // 4. Perform the Supabase insert operation
      // Use .select() to get the inserted data back
      const { data: insertedData, error: supabaseError } = await supabase
        .from(JOB_DESCRIPTION)
        .insert({ description })
        .select(); // .select() is good practice to get the data returned

      if (supabaseError) {
        setError(`Supabase insert error: ${supabaseError.message}`)
      } else if (insertedData) {
        setData(insertedData)
        // Optionally, clear the input field on success
        e.currentTarget.reset();
      }
    } catch (err: any) {
      // Catch any unexpected errors during the process
      setError(err.message || "An unexpected error occurred.")
      console.error("Submission error:", err)
    } finally {
      setLoading(false) // Always set loading to false
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded shadow-md">
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

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {data && (
        <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-md">
          <p className="font-semibold">Successfully created:</p>
          <pre className="whitespace-pre-wrap break-words">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}
    </form>
  )
}