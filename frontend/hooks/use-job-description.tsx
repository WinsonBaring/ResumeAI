
'use client'
// import { createClient } from '@/utils/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { JOB_DESCRIPTION} from "@/const/variables"
import { useSupabaseClient } from '@/hooks/useSupabaseClient';
import { getQueryClient } from '@/providers/ReactQueryProvider';

export default function useJobDescription(){
    const supabase = useSupabaseClient();
    const fetchJD = async() =>{ return await supabase.from(JOB_DESCRIPTION).select();}
    const info= useQuery({ queryKey: [JOB_DESCRIPTION], queryFn: fetchJD })
    return info;
}
