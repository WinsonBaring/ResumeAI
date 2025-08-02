'use server'

import { auth } from '@clerk/nextjs/server';
import { createServerSupabaseClient } from '@/utils/supabase/server';
import { StorageService } from '@/utils/supabase/storage';
import { ResumeData } from '@/utils/pdf-generator';
import { revalidateTag } from 'next/cache';

export interface SaveResumeVersionData {
  resumeId: number;
  title: string | null;
  content: string;
  settings: Record<string, any>;
  pdfBlob?: Blob;
}

export async function saveResumeVersion(data: SaveResumeVersionData) {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) {
    redirectToSignIn();
  }

  const supabase = createServerSupabaseClient();

  try {
    // Get the next version number
    const { data: versionData, error: versionError } = await supabase
      .rpc('get_next_version_number', { resume_id_param: data.resumeId });

    if (versionError) {
      throw new Error(`Failed to get version number: ${versionError.message}`);
    }

    const versionNumber = versionData || 1;

    let pdfUrl: string | null = null;
    let storedFilename: string | null = null;

    // Upload PDF to storage if provided
    if (data.pdfBlob) {
      const safeTitle = data.title || 'Resume';
      const filename = `${safeTitle.replace(/[^a-zA-Z0-9]/g, '_')}_v${versionNumber}.pdf`;
      const uploadResult = await StorageService.uploadPDF(
        data.pdfBlob,
        filename,
        userId || 'default',
        data.resumeId,
        versionNumber
      );
      pdfUrl = uploadResult.url;
      storedFilename = uploadResult.filename;
    }

    // Save resume version to database
    const { data: savedVersion, error: saveError } = await supabase
      .from('Resume Versions')
      .insert({
        resume_id: data.resumeId,
        user_id: userId,
        version_number: versionNumber,
        title: data.title || 'Untitled Resume',
        content: data.content,
        pdf_url: pdfUrl,
        pdf_filename: storedFilename,
        settings: data.settings
      })
      .select()
      .single();

    if (saveError) {
      // If database save fails, delete the uploaded PDF
      try {
        await StorageService.deletePDF(`${userId}/${data.resumeId}/v${versionNumber}/${storedFilename}`);
      } catch (deleteError) {
        console.error('Failed to delete PDF after database error:', deleteError);
      }
      throw new Error(`Failed to save resume version: ${saveError.message}`);
    }

    // Revalidate cache
    revalidateTag('resume-versions');

    return {
      success: true,
      data: savedVersion,
      pdfUrl,
      versionNumber
    };

  } catch (error) {
    console.error('Save resume version error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

export async function getResumeVersions(resumeId: number) {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) {
    redirectToSignIn();
  }

  const supabase = createServerSupabaseClient();

  try {
    const { data, error } = await supabase
      .from('Resume Versions')
      .select('*')
      .eq('resume_id', resumeId)
      .eq('user_id', userId)
      .order('version_number', { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch resume versions: ${error.message}`);
    }

    return {
      success: true,
      data
    };

  } catch (error) {
    console.error('Get resume versions error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

export async function downloadResumeVersion(versionId: number) {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) {
    redirectToSignIn();
  }

  const supabase = createServerSupabaseClient();

  try {
    const { data, error } = await supabase
      .from('Resume Versions')
      .select('pdf_url, pdf_filename, title')
      .eq('id', versionId)
      .eq('user_id', userId)
      .single();

    if (error) {
      throw new Error(`Failed to fetch resume version: ${error.message}`);
    }

    if (!data.pdf_url) {
      throw new Error('PDF not found for this version');
    }

    // Download the PDF
    const pdfBlob = await StorageService.downloadPDF(data.pdf_url);

    return {
      success: true,
      data: {
        blob: pdfBlob,
        filename: data.pdf_filename || `${data.title}.pdf`
      }
    };

  } catch (error) {
    console.error('Download resume version error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
} 