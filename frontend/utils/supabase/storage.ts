import { createClient } from '@supabase/supabase-js';
import { Database } from '@/utils/supabase/database.types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export class StorageService {
  private static supabase = createClient<Database>(supabaseUrl, supabaseKey);

  static async uploadPDF(
    file: Blob, 
    filename: string, 
    userId: string,
    resumeId: number,
    versionNumber: number
  ): Promise<{ url: string; filename: string }> {
    const bucketName = 'resume-pdfs';
    const filePath = `${userId}/${resumeId}/v${versionNumber}/${filename}`;

    try {
      // Upload the file
      const { data, error } = await this.supabase.storage
        .from(bucketName)
        .upload(filePath, file, {
          contentType: 'application/pdf',
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        throw new Error(`Upload failed: ${error.message}`);
      }

      // Get the public URL
      const { data: urlData } = this.supabase.storage
        .from(bucketName)
        .getPublicUrl(filePath);

      return {
        url: urlData.publicUrl,
        filename: filename
      };
    } catch (error) {
      console.error('Storage upload error:', error);
      throw error;
    }
  }

  static async downloadPDF(url: string): Promise<Blob> {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Download failed: ${response.statusText}`);
      }
      return await response.blob();
    } catch (error) {
      console.error('Storage download error:', error);
      throw error;
    }
  }

  static async deletePDF(filePath: string): Promise<void> {
    try {
      const { error } = await this.supabase.storage
        .from('resume-pdfs')
        .remove([filePath]);

      if (error) {
        throw new Error(`Delete failed: ${error.message}`);
      }
    } catch (error) {
      console.error('Storage delete error:', error);
      throw error;
    }
  }

  static getPDFUrl(userId: string, resumeId: number, versionNumber: number, filename: string): string {
    const filePath = `${userId}/${resumeId}/v${versionNumber}/${filename}`;
    const { data } = this.supabase.storage
      .from('resume-pdfs')
      .getPublicUrl(filePath);
    
    return data.publicUrl;
  }
} 