-- Create storage bucket for resume PDFs
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'resume-pdfs',
  'resume-pdfs',
  true,
  52428800, -- 50MB limit
  ARRAY['application/pdf']
) ON CONFLICT (id) DO NOTHING;

-- Create storage policy for authenticated users
CREATE POLICY "Authenticated users can upload resume PDFs" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'resume-pdfs' AND 
    auth.role() = 'authenticated'
  );

-- Create storage policy for users to view their own PDFs
CREATE POLICY "Users can view their own resume PDFs" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'resume-pdfs' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Create storage policy for users to update their own PDFs
CREATE POLICY "Users can update their own resume PDFs" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'resume-pdfs' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Create storage policy for users to delete their own PDFs
CREATE POLICY "Users can delete their own resume PDFs" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'resume-pdfs' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  ); 