import { JOB_DESCRIPTION } from '@/const/variables'
import { createServerSupabaseClient } from '@/utils/supabase/server'
import { unstable_cache, } from 'next/cache'

export const useJobDescription = unstable_cache(async () => {
    const supabase = createServerSupabaseClient()
    const result = await supabase.from(JOB_DESCRIPTION).select();
    return result;
},
    [JOB_DESCRIPTION], // add the user ID to the cache key
    {
        tags: [JOB_DESCRIPTION],
        revalidate: 60,
    }
)