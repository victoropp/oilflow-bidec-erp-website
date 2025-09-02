import { Resend } from 'resend';
import { siteConfig } from '@/config/site';
import { DatabaseService } from './database';

const resend = new Resend(process.env.RESEND_API_KEY);

export interface DemoRequestData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  jobTitle: string;
  companySize: string;
  industry: string;
  currentSoftware?: string;
  challenges: string;
  additionalNotes?: string;
  preferredDate: string;
  preferredTime: string;
}

export class EmailService {
  static async sendDemoConfirmationEmail(
    data: DemoRequestData,
    requestId: string,
    demoRequestDbId?: string
  ) {
    try {
      const subject = 'Demo Request Confirmation - OilFlow BIDEC ERP';
      const htmlContent = this.generateCustomerConfirmationEmail(data, requestId);

      const emailResponse = await resend.emails.send({
        from: `OilFlow BIDEC <${process.env.RESEND_FROM_EMAIL || 'noreply@oilflowbidec.com'}>`,
        to: [data.email],
        subject,
        html: htmlContent,
      });

      // Log email success
      await DatabaseService.logEmailSent({
        demoRequestId: demoRequestDbId,
        emailType: 'confirmation',
        recipient: data.email,
        subject,
        status: 'sent',
        provider: 'resend',
        providerId: emailResponse.data?.id,
      });

      return { success: true, data: emailResponse.data };
    } catch (error) {
      console.error('Failed to send confirmation email:', error);

      // Log email failure
      await DatabaseService.logEmailSent({
        demoRequestId: demoRequestDbId,
        emailType: 'confirmation',
        recipient: data.email,
        subject: 'Demo Request Confirmation - OilFlow BIDEC ERP',
        status: 'failed',
        provider: 'resend',
        error: error instanceof Error ? error.message : 'Unknown error',
      });

      return { success: false, error };
    }
  }

  static async sendSalesTeamNotification(
    data: DemoRequestData,
    requestId: string,
    demoRequestDbId?: string
  ) {
    try {
      const subject = `New Demo Request from ${data.company} - ${data.firstName} ${data.lastName}`;
      const htmlContent = this.generateSalesNotificationEmail(data, requestId);

      const salesEmail = process.env.SALES_TEAM_EMAIL || siteConfig.contact.email;
      
      const emailResponse = await resend.emails.send({
        from: `OilFlow BIDEC <${process.env.RESEND_FROM_EMAIL || 'noreply@oilflowbidec.com'}>`,
        to: [salesEmail],
        subject,
        html: htmlContent,
      });

      // Log email success
      await DatabaseService.logEmailSent({
        demoRequestId: demoRequestDbId,
        emailType: 'sales_notification',
        recipient: salesEmail,
        subject,
        status: 'sent',
        provider: 'resend',
        providerId: emailResponse.data?.id,
      });

      return { success: true, data: emailResponse.data };
    } catch (error) {
      console.error('Failed to send sales team notification:', error);

      // Log email failure
      await DatabaseService.logEmailSent({
        demoRequestId: demoRequestDbId,
        emailType: 'sales_notification',
        recipient: process.env.SALES_TEAM_EMAIL || siteConfig.contact.email,
        subject: `New Demo Request from ${data.company}`,
        status: 'failed',
        provider: 'resend',
        error: error instanceof Error ? error.message : 'Unknown error',
      });

      return { success: false, error };
    }
  }

  private static generateCustomerConfirmationEmail(data: DemoRequestData, requestId: string): string {
    const industryLabels: Record<string, string> = {
      'petroleum-trading': 'Petroleum Trading',
      'depot-operations': 'Depot Operations',
      'vessel-management': 'Vessel Management',
      'banking-integration': 'Banking & Finance',
      'financial-services': 'Financial Services',
      'other': 'Other',
    };

    const timeLabels: Record<string, string> = {
      'morning': 'Morning (9 AM - 12 PM)',
      'afternoon': 'Afternoon (1 PM - 5 PM)',
      'flexible': 'Flexible',
    };

    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Demo Request Confirmation</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
          .header { background: linear-gradient(135deg, #1e40af, #3b82f6); color: white; padding: 30px; text-align: center; }
          .logo { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
          .content { padding: 30px; background: #fff; }
          .details { background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .detail-item { margin: 8px 0; }
          .detail-label { font-weight: bold; color: #475569; }
          .steps { background: #ecfeff; padding: 20px; border-radius: 8px; border-left: 4px solid #06b6d4; }
          .contact-info { background: #f1f5f9; padding: 20px; border-radius: 8px; margin-top: 20px; }
          .footer { text-align: center; padding: 20px; color: #64748b; font-size: 14px; }
          .button { display: inline-block; background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px 0; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">OilFlow BIDEC ERP</div>
          <h1>Demo Request Confirmation</h1>
        </div>
        
        <div class="content">
          <p>Dear ${data.firstName} ${data.lastName},</p>
          
          <p>Thank you for requesting a demo of OilFlow BIDEC ERP! We're excited to show you how our petroleum operations management system can transform your business processes.</p>
          
          <div class="details">
            <h3>📋 Request Details</h3>
            <div class="detail-item">
              <span class="detail-label">Request ID:</span> ${requestId}
            </div>
            <div class="detail-item">
              <span class="detail-label">Company:</span> ${data.company}
            </div>
            <div class="detail-item">
              <span class="detail-label">Industry:</span> ${industryLabels[data.industry] || data.industry}
            </div>
            <div class="detail-item">
              <span class="detail-label">Preferred Date:</span> ${data.preferredDate}
            </div>
            <div class="detail-item">
              <span class="detail-label">Preferred Time:</span> ${timeLabels[data.preferredTime] || data.preferredTime}
            </div>
          </div>
          
          <div class="steps">
            <h3>🚀 What happens next?</h3>
            <ol>
              <li><strong>Quick Response:</strong> Our sales team will contact you within 24 hours</li>
              <li><strong>Schedule Demo:</strong> We'll find a convenient time that works for your schedule</li>
              <li><strong>Personalized Demo:</strong> You'll receive a calendar invite with Zoom/Teams meeting details</li>
              <li><strong>Tailored Presentation:</strong> We'll focus on your specific challenges: "${data.challenges}"</li>
            </ol>
          </div>
          
          <div class="contact-info">
            <h3>📞 Need immediate assistance?</h3>
            <p>Feel free to contact us directly:</p>
            <ul style="list-style: none; padding: 0;">
              <li>📧 Email: ${siteConfig.contact.email}</li>
              <li>📱 Phone (UK): ${siteConfig.contact.phone}</li>
              <li>📱 Phone (Ghana): ${siteConfig.contact.phoneGhana}</li>
            </ul>
          </div>
          
          <p>We look forward to demonstrating how OilFlow BIDEC ERP can streamline your petroleum operations and drive your business growth!</p>
          
          <p>Best regards,<br>
          <strong>The OilFlow BIDEC Sales Team</strong></p>
        </div>
        
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} BIDEC Solutions. All rights reserved.</p>
          <p>This email was sent regarding your demo request for OilFlow BIDEC ERP.</p>
        </div>
      </body>
      </html>
    `;
  }

  private static generateSalesNotificationEmail(data: DemoRequestData, requestId: string): string {
    const industryLabels: Record<string, string> = {
      'petroleum-trading': 'Petroleum Trading',
      'depot-operations': 'Depot Operations',
      'vessel-management': 'Vessel Management',
      'banking-integration': 'Banking & Finance',
      'financial-services': 'Financial Services',
      'other': 'Other',
    };

    const companySizeLabels: Record<string, string> = {
      '1-50': '1-50 employees',
      '51-200': '51-200 employees',
      '201-1000': '201-1,000 employees',
      '1000+': '1,000+ employees',
    };

    const timeLabels: Record<string, string> = {
      'morning': 'Morning (9 AM - 12 PM)',
      'afternoon': 'Afternoon (1 PM - 5 PM)',
      'flexible': 'Flexible',
    };

    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Demo Request</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 700px; margin: 0 auto; }
          .header { background: linear-gradient(135deg, #dc2626, #ef4444); color: white; padding: 20px; text-align: center; }
          .priority { background: #fef2f2; border-left: 4px solid #dc2626; padding: 15px; margin: 20px 0; }
          .content { padding: 30px; background: #fff; }
          .section { margin: 25px 0; padding: 20px; background: #f8fafc; border-radius: 8px; }
          .detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
          .detail-item { margin: 8px 0; }
          .detail-label { font-weight: bold; color: #475569; }
          .challenges { background: #fff7ed; padding: 20px; border-radius: 8px; border-left: 4px solid #f59e0b; }
          .action-items { background: #f0f9ff; padding: 20px; border-radius: 8px; border-left: 4px solid #0ea5e9; }
          .footer { text-align: center; padding: 20px; color: #64748b; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🚨 New Demo Request</h1>
          <p>Follow up required within 24 hours</p>
        </div>
        
        <div class="content">
          <div class="priority">
            <strong>⚡ PRIORITY:</strong> New demo request from <strong>${data.company}</strong> in the <strong>${industryLabels[data.industry]}</strong> sector.
            <br><strong>Preferred Demo Date:</strong> ${data.preferredDate}
          </div>
          
          <div class="section">
            <h3>👤 Contact Information</h3>
            <div class="detail-grid">
              <div>
                <div class="detail-item">
                  <span class="detail-label">Name:</span> ${data.firstName} ${data.lastName}
                </div>
                <div class="detail-item">
                  <span class="detail-label">Job Title:</span> ${data.jobTitle}
                </div>
                <div class="detail-item">
                  <span class="detail-label">Email:</span> <a href="mailto:${data.email}">${data.email}</a>
                </div>
              </div>
              <div>
                <div class="detail-item">
                  <span class="detail-label">Phone:</span> <a href="tel:${data.phone}">${data.phone}</a>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Company:</span> ${data.company}
                </div>
              </div>
            </div>
          </div>
          
          <div class="section">
            <h3>🏢 Company Details</h3>
            <div class="detail-grid">
              <div>
                <div class="detail-item">
                  <span class="detail-label">Industry:</span> ${industryLabels[data.industry] || data.industry}
                </div>
                <div class="detail-item">
                  <span class="detail-label">Company Size:</span> ${companySizeLabels[data.companySize] || data.companySize}
                </div>
              </div>
              <div>
                <div class="detail-item">
                  <span class="detail-label">Current Software:</span> ${data.currentSoftware || 'Not specified'}
                </div>
              </div>
            </div>
          </div>
          
          <div class="section">
            <h3>📅 Demo Preferences</h3>
            <div class="detail-grid">
              <div>
                <div class="detail-item">
                  <span class="detail-label">Preferred Date:</span> ${data.preferredDate}
                </div>
              </div>
              <div>
                <div class="detail-item">
                  <span class="detail-label">Preferred Time:</span> ${timeLabels[data.preferredTime] || data.preferredTime}
                </div>
              </div>
            </div>
          </div>
          
          <div class="challenges">
            <h3>💼 Business Challenges</h3>
            <p><em>"${data.challenges}"</em></p>
            ${data.additionalNotes ? `
            <h4>📝 Additional Notes</h4>
            <p><em>"${data.additionalNotes}"</em></p>
            ` : ''}
          </div>
          
          <div class="action-items">
            <h3>✅ Action Items</h3>
            <ol>
              <li><strong>Immediate:</strong> Contact ${data.firstName} within 24 hours via email or phone</li>
              <li><strong>Research:</strong> Review their industry sector and company size for tailored demo</li>
              <li><strong>Prepare:</strong> Focus demo on "${data.challenges}"</li>
              <li><strong>Schedule:</strong> Book demo for ${data.preferredDate} (${timeLabels[data.preferredTime]})</li>
              <li><strong>Follow-up:</strong> Send calendar invite and preparation materials</li>
            </ol>
          </div>
          
          <div class="section">
            <h3>🔍 Request Metadata</h3>
            <div class="detail-item">
              <span class="detail-label">Request ID:</span> ${requestId}
            </div>
            <div class="detail-item">
              <span class="detail-label">Submitted:</span> ${new Date().toLocaleString()}
            </div>
          </div>
        </div>
        
        <div class="footer">
          <p>OilFlow BIDEC ERP - Sales Team Notification System</p>
          <p>This is an automated notification. Please follow up promptly.</p>
        </div>
      </body>
      </html>
    `;
  }
}

export default EmailService;