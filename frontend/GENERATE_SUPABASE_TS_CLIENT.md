https://supabase.com/docs/guides/api/rest/generating-types

npx supabase login

cd frontend/utils/supabase

npx supabase gen types typescript --project-id "ydfujqyyedtussfgydfi" --schema public > database.types.ts
