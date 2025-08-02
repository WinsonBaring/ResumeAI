-- Active: 1743284806651@@127.0.0.1@5432
-- Create resume_versions table for storing PDF files and versioning
CREATE TABLE IF NOT EXISTS "Resume Versions" (
    id SERIAL PRIMARY KEY,
    resume_id INTEGER NOT NULL REFERENCES "Resume"(id) ON DELETE CASCADE,
    user_id TEXT NOT NULL,
    version_number INTEGER NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    pdf_url TEXT,
    pdf_filename TEXT,
    settings JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(resume_id, version_number)
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_resume_versions_resume_id ON "Resume Versions"(resume_id);
CREATE INDEX IF NOT EXISTS idx_resume_versions_user_id ON "Resume Versions"(user_id);

-- Enable RLS
ALTER TABLE "Resume Versions" ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own resume versions" ON "Resume Versions"
    FOR SELECT USING (auth.uid()::text = user_id);

CREATE POLICY "Users can insert their own resume versions" ON "Resume Versions"
    FOR INSERT WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can update their own resume versions" ON "Resume Versions"
    FOR UPDATE USING (auth.uid()::text = user_id);

CREATE POLICY "Users can delete their own resume versions" ON "Resume Versions"
    FOR DELETE USING (auth.uid()::text = user_id);

-- Create function to auto-increment version number
CREATE OR REPLACE FUNCTION get_next_version_number(resume_id_param INTEGER)
RETURNS INTEGER AS $$
BEGIN
    RETURN COALESCE(
        (SELECT MAX(version_number) + 1 
         FROM "Resume Versions" 
         WHERE resume_id = resume_id_param), 
        1
    );
END;
$$ LANGUAGE plpgsql; 