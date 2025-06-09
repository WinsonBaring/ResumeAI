import { createClient } from "@supabase/supabase-js";
import { useSession, useUser } from "@clerk/nextjs";
import {Database} from "@/utils/supabase/database.types"

export function createClerkSupabaseClient<Database>() {
    const { session } = useSession();

    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            async accessToken() {
                return session?.getToken() ?? null;
            },
        }
    );
}