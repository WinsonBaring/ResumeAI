# Getting Started

Follow these steps to set up and run the project:

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd <your-project-directory>
   ```

2. **Deploy on Vercel**
   - Push your code to GitHub (or your preferred git provider).
   - Import the project into [Vercel](https://vercel.com/) and follow the deployment instructions.

3. **Set up Clerk (Authentication)**
   - Create an account at [Clerk](https://clerk.com/).
   - Set up a new application and obtain your Clerk API keys.
   - Add your Clerk environment variables to Vercel.

4. **Set up Supabase (Database)**
   - Create a new project at [Supabase](https://supabase.com/).
   - Get your Supabase URL and API keys.
   - Add your Supabase environment variables to Vercel.

5. **Connect Clerk and Supabase**
   - Follow the [Clerk + Supabase integration guide](https://clerk.com/docs/guides/supabase) to sync authentication between the two services.

---

## Supabase Setup

To automatically sync the `user_id` column in your tables with the authenticated user's JWT `sub` claim, follow these steps in your Supabase SQL editor:

1. **Create a helper function to extract the user's `sub` (subject) from the JWT:**

   ```sql
   create or replace function requesting_user_id()
   returns text as $$
     select nullif(
       current_setting('request.jwt.claims', true)::json->>'sub',
       ''
     )::text;
   $$ language sql stable;
   ```

   This function retrieves the unique user ID (`sub`) from the JWT claims, which Clerk provides for each authenticated user.

2. **Add a `user_id` column to your table (if it doesn't already exist), and set its default value to the authenticated user's `sub`:**

   ```sql
   alter table public."Job Description"
   alter column user_id set default requesting_user_id();
   ```

   This ensures that whenever a new row is inserted, the `user_id` will automatically be set to the currently authenticated user's ID.

3. **(Optional) Enable Row Level Security (RLS) and add policies to restrict access to each user's own data:**

   ```sql
   -- Enable RLS
   alter table public."Job Description" enable row level security;

   -- Allow users to access only their own rows
   create policy "Users can access their own job descriptions"
     on public."Job Description"
     for all
     using (user_id = requesting_user_id());
   ```

With this setup, your Supabase tables will automatically associate data with the authenticated user, and you can safely enforce per-user data access.
