
'use client'
import { createClient } from '@/utils/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { JOB_DESCRIPTION} from "@/const/variables"

export default function useJobDescription(){
    const supabase = createClient();
    const fetchJD = async() =>{ return await supabase.from(JOB_DESCRIPTION).select();}
    const info= useQuery({ queryKey: [JOB_DESCRIPTION], queryFn: fetchJD })
    // queryClient.invalidateQueries({queryKey:[JOB_DESCRIPTION]})
    return info;
}
