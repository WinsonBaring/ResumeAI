
import { getJobDescription } from "@/api/get-job-description"
import { WorkPositionClient } from "./work-position-client"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

export async function WorkPositionPanel() {

    const { data: jobDescriptions, error } = await getJobDescription()

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <div className="text-red-500 text-lg font-semibold mb-2">
                        Failed to load job descriptions
                    </div>
                    <p className="text-gray-600">{error}</p>
                </div>
            </div>
        )
    }

    return (
        <WorkPositionClient 
            initialJobDescriptions={jobDescriptions || []} 
        />
    )
}
