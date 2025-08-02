'use server'

import { auth } from '@clerk/nextjs/server'
import { createServerSupabaseClient } from '@/utils/supabase/server'
import { revalidateTag } from 'next/cache'
import { JOB_DESCRIPTION } from '@/const/variables'

export interface JobDescriptionData {
    title: string
    company: string
    description: string
    resume_id: number
}

export async function saveJobDescription(data: JobDescriptionData) {
    const { userId, redirectToSignIn } = await auth()

    if (!userId) {
        redirectToSignIn()
    }

    const supabase = createServerSupabaseClient()

    try {
        const { data: savedJob, error } = await supabase
            .from('Job Description')
            .insert({
                title: data.title,
                company: data.company,
                description: data.description,
                resume_id: data.resume_id,
                user_id: userId,
                lastUsed: new Date().toISOString()
            })
            .select()
            .single()

        if (error) {
            throw new Error(`Failed to save job description: ${error.message}`)
        }

        // Revalidate cache
        revalidateTag(JOB_DESCRIPTION)

        return {
            success: true,
            data: savedJob
        }

    } catch (error) {
        console.error('Save job description error:', error)
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error occurred'
        }
    }
}

export async function updateJobDescription(jobId: number, data: Partial<JobDescriptionData>) {
    const { userId, redirectToSignIn } = await auth()

    if (!userId) {
        redirectToSignIn()
    }

    const supabase = createServerSupabaseClient()

    try {
        const { data: updatedJob, error } = await supabase
            .from('Job Description')
            .update({
                title: data.title,
                company: data.company,
                description: data.description,
                lastUsed: new Date().toISOString()
            })
            .eq('job_id', jobId)
            .eq('user_id', userId)
            .select()
            .single()

        if (error) {
            throw new Error(`Failed to update job description: ${error.message}`)
        }

        // Revalidate cache
        revalidateTag(JOB_DESCRIPTION)

        return {
            success: true,
            data: updatedJob
        }

    } catch (error) {
        console.error('Update job description error:', error)
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error occurred'
        }
    }
}

export async function deleteJobDescription(jobId: number) {
    const { userId, redirectToSignIn } = await auth()

    if (!userId) {
        redirectToSignIn()
    }

    const supabase = createServerSupabaseClient()

    try {
        const { error } = await supabase
            .from('Job Description')
            .delete()
            .eq('job_id', jobId)
            .eq('user_id', userId)

        if (error) {
            throw new Error(`Failed to delete job description: ${error.message}`)
        }

        // Revalidate cache
        revalidateTag(JOB_DESCRIPTION)

        return {
            success: true
        }

    } catch (error) {
        console.error('Delete job description error:', error)
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error occurred'
        }
    }
} 