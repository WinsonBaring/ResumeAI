import { createClient } from "@supabase/supabase-js";
import { useSession, useUser } from "@clerk/nextjs";
import { Database } from "./database.types";

export function createClerkSupabaseClient() {
    const { session } = useSession();

    return createClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            async accessToken() {
                return session?.getToken() ?? null;
            },
        }
    );
}