import { useState, useEffect } from 'react'
import { createClerkSupabaseClient } from '@/utils/supabase/client'
import { useUser } from '@clerk/nextjs'

export function useResumeId() {
    const { user } = useUser()
    const [resumeId, setResumeId] = useState<number | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function getResumeId() {
            if (!user) {
                setLoading(false)
                return
            }

            try {
                const supabase = createClerkSupabaseClient()
                const { data, error } = await supabase
                    .from('Resume')
                    .select('id')
                    .eq('user_id', user.id)
                    .order('created_at', { ascending: false })
                    .limit(1)
                    .single()

                if (error) {
                    console.error('Error fetching resume ID:', error)
                    // Create a default resume if none exists
                    const { data: newResume, error: createError } = await supabase
                        .from('Resume')
                        .insert({
                            title: 'My Resume',
                            description: 'Default resume',
                            user_id: user.id
                        })
                        .select('id')
                        .single()

                    if (createError) {
                        console.error('Error creating default resume:', createError)
                        setResumeId(1) // Fallback
                    } else {
                        setResumeId(newResume.id)
                    }
                } else {
                    setResumeId(data.id)
                }
            } catch (error) {
                console.error('Error in useResumeId:', error)
                setResumeId(1) // Fallback
            } finally {
                setLoading(false)
            }
        }

        getResumeId()
    }, [user])

    return { resumeId, loading }
} 