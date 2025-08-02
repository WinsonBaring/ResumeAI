# Resume Generation Feature Setup

This document explains how to set up and use the resume generation feature with PDF storage in Supabase.

## Features Implemented

✅ **PDF Generation**: Generate PDFs from resume content using jsPDF and html2canvas
✅ **Supabase Storage**: Store PDFs in Supabase storage with versioning
✅ **Version Management**: Track different versions of resumes
✅ **Download Functionality**: Download PDFs directly from the browser
✅ **Cloud Storage**: Save resumes to Supabase storage for later access
✅ **Modern UI**: Beautiful interface using Tailwind CSS and shadcn/ui

## Setup Instructions

### 1. Install Dependencies

```bash
npm install jspdf html2canvas @types/jspdf
```

### 2. Database Setup

Run the migration to create the resume versions table:

```bash
# Apply the migration
supabase db push

# Or run the SQL manually in your Supabase dashboard
```

### 3. Storage Setup

Run the storage setup script in your Supabase SQL editor:

```sql
-- Copy and paste the contents of supabase/setup-storage.sql
```

### 4. Environment Variables

Ensure your environment variables are set up in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## How It Works

### 1. Resume Generation Process

1. **Setup Phase**: User selects job description and experience snippets
2. **Generation Phase**: AI generates resume content (simulated for now)
3. **Preview Phase**: User sees the generated resume with options to:
   - Download PDF locally
   - Save to Supabase storage
   - Regenerate with different settings

### 2. PDF Generation

- Uses `jsPDF` and `html2canvas` to convert HTML resume preview to PDF
- Supports multi-page resumes
- High-quality output with proper formatting

### 3. Storage Structure

PDFs are stored in Supabase storage with the following structure:
```
resume-pdfs/
├── {user_id}/
│   ├── {resume_id}/
│   │   ├── v1/
│   │   │   └── resume_name_v1.pdf
│   │   ├── v2/
│   │   │   └── resume_name_v2.pdf
│   │   └── ...
```

### 4. Version Management

- Each resume save creates a new version
- Versions are numbered sequentially (v1, v2, v3, etc.)
- Users can download any previous version
- Version history is maintained in the database

## Usage

### Generating a Resume

1. Navigate to `/resume-generation`
2. Select your target job description
3. Choose experience snippets to include
4. Click "Generate Resume"
5. Review the generated resume
6. Use the action buttons to:
   - **Download PDF**: Save locally
   - **Save to Cloud**: Store in Supabase with versioning
   - **Regenerate**: Create a new version with different settings

### Managing Versions

- All saved versions are automatically stored in Supabase
- Each version includes the PDF file and metadata
- Users can download any previous version
- Version history shows creation date and version number

## File Structure

```
frontend/
├── utils/
│   ├── pdf-generator.ts          # PDF generation utilities
│   └── supabase/
│       └── storage.ts            # Supabase storage operations
├── api/actions/
│   └── save-resume-version.tsx   # Server actions for saving
├── app/resume-generation/
│   └── resume-generation-panel.tsx # Main UI component
├── components/
│   └── resume-version-list.tsx   # Version management UI
└── supabase/
    ├── migrations/
    │   └── 20241201000000_create_resume_versions.sql
    └── setup-storage.sql         # Storage bucket setup
```

## Technical Details

### PDF Generation
- **Library**: jsPDF + html2canvas
- **Quality**: High-resolution (2x scale)
- **Format**: A4 portrait
- **Multi-page**: Automatic page breaks

### Storage Security
- **RLS**: Row Level Security enabled
- **User Isolation**: Users can only access their own files
- **File Types**: Only PDF files allowed
- **Size Limit**: 50MB per file

### Performance
- **Client-side**: PDF generation happens in browser
- **Caching**: Supabase handles file caching
- **CDN**: Files served via Supabase CDN

## Future Enhancements

- [ ] AI-powered resume content generation
- [ ] Multiple resume templates
- [ ] Collaborative editing
- [ ] Resume analytics
- [ ] Integration with job boards
- [ ] ATS optimization scoring

## Troubleshooting

### Common Issues

1. **PDF Generation Fails**
   - Check browser console for errors
   - Ensure all images are loaded
   - Try refreshing the page

2. **Storage Upload Fails**
   - Verify Supabase storage bucket exists
   - Check RLS policies
   - Ensure user is authenticated

3. **Version Not Saving**
   - Check database connection
   - Verify user permissions
   - Check console for error messages

### Debug Mode

Enable debug logging by adding to your component:

```typescript
console.log('PDF Blob:', pdfBlob)
console.log('Storage URL:', pdfUrl)
console.log('Version Data:', savedVersion)
```

## Support

For issues or questions:
1. Check the browser console for errors
2. Verify Supabase configuration
3. Test with a simple resume first
4. Check network tab for failed requests 