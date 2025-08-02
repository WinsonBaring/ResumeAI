import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export interface ResumeData {
  name: string;
  email: string;
  phone: string;
  summary: string;
  experience: Array<{
    title: string;
    company: string;
    period: string;
    achievements: string[];
  }>;
  skills: string[];
  education?: Array<{
    degree: string;
    school: string;
    year: string;
  }>;
}

export class PDFGenerator {
  private static async captureElement(element: HTMLElement): Promise<HTMLCanvasElement> {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      width: element.offsetWidth,
      height: element.offsetHeight,
    });
    return canvas;
  }

  private static async generatePDFFromCanvas(canvas: HTMLCanvasElement, filename: string): Promise<Blob> {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 295; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    // Add first page
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Add additional pages if needed
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    return pdf.output('blob');
  }

  static async generatePDFFromHTML(element: HTMLElement, filename: string): Promise<Blob> {
    const canvas = await this.captureElement(element);
    return this.generatePDFFromCanvas(canvas, filename);
  }

  static async generatePDFFromData(data: ResumeData, filename: string): Promise<Blob> {
    // Create a temporary div to render the resume
    const tempDiv = document.createElement('div');
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    tempDiv.style.top = '-9999px';
    tempDiv.style.width = '800px';
    tempDiv.style.backgroundColor = 'white';
    tempDiv.style.padding = '40px';
    tempDiv.style.fontFamily = 'Arial, sans-serif';
    tempDiv.style.fontSize = '12px';
    tempDiv.style.lineHeight = '1.4';
    
    tempDiv.innerHTML = this.generateResumeHTML(data);
    document.body.appendChild(tempDiv);

    try {
      const canvas = await this.captureElement(tempDiv);
      return this.generatePDFFromCanvas(canvas, filename);
    } finally {
      document.body.removeChild(tempDiv);
    }
  }

  private static generateResumeHTML(data: ResumeData): string {
    return `
      <div style="max-width: 800px; margin: 0 auto; font-family: Arial, sans-serif; line-height: 1.4;">
        <!-- Header -->
        <div style="text-align: center; border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 20px;">
          <h1 style="margin: 0; font-size: 28px; color: #333;">${data.name}</h1>
          <p style="margin: 5px 0; color: #666;">${data.email} | ${data.phone}</p>
        </div>

        <!-- Summary -->
        <div style="margin-bottom: 20px;">
          <h2 style="font-size: 18px; color: #333; border-bottom: 1px solid #ccc; padding-bottom: 5px;">Professional Summary</h2>
          <p style="margin: 10px 0; text-align: justify;">${data.summary}</p>
        </div>

        <!-- Experience -->
        <div style="margin-bottom: 20px;">
          <h2 style="font-size: 18px; color: #333; border-bottom: 1px solid #ccc; padding-bottom: 5px;">Professional Experience</h2>
          ${data.experience.map(exp => `
            <div style="margin-bottom: 15px;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 5px;">
                <div>
                  <h3 style="margin: 0; font-size: 16px; font-weight: bold;">${exp.title}</h3>
                  <p style="margin: 0; color: #666;">${exp.company}</p>
                </div>
                <span style="color: #666; font-size: 14px;">${exp.period}</span>
              </div>
              <ul style="margin: 5px 0; padding-left: 20px;">
                ${exp.achievements.map(achievement => `<li style="margin-bottom: 3px;">${achievement}</li>`).join('')}
              </ul>
            </div>
          `).join('')}
        </div>

        <!-- Skills -->
        ${data.skills.length > 0 ? `
          <div style="margin-bottom: 20px;">
            <h2 style="font-size: 18px; color: #333; border-bottom: 1px solid #ccc; padding-bottom: 5px;">Skills</h2>
            <p style="margin: 10px 0;">${data.skills.join(', ')}</p>
          </div>
        ` : ''}

        <!-- Education -->
        ${data.education && data.education.length > 0 ? `
          <div style="margin-bottom: 20px;">
            <h2 style="font-size: 18px; color: #333; border-bottom: 1px solid #ccc; padding-bottom: 5px;">Education</h2>
            ${data.education.map(edu => `
              <div style="margin-bottom: 10px;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                  <div>
                    <h3 style="margin: 0; font-size: 16px; font-weight: bold;">${edu.degree}</h3>
                    <p style="margin: 0; color: #666;">${edu.school}</p>
                  </div>
                  <span style="color: #666; font-size: 14px;">${edu.year}</span>
                </div>
              </div>
            `).join('')}
          </div>
        ` : ''}
      </div>
    `;
  }

  static downloadPDF(blob: Blob, filename: string): void {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
} 