import { createClient } from "@supabase/supabase-js";
import { useSession, useUser } from "@clerk/nextjs";

function createClerkSupabaseClient() {
    const { session } = useSession();
    return createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_KEY!,
      {
        async accessToken() {
          return session?.getToken() ?? null;
        },
      }
    );
  }