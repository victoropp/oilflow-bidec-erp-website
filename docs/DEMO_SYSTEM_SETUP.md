# Demo Scheduling System - Setup Guide

## Overview

The demo scheduling system is now fully functional with proper form validation, API endpoints, and email notification infrastructure. Users can request personalized demos through the `/request-demo` page.

## Features

### ✅ Completed Features

1. **Comprehensive Demo Form**
   - Personal information collection (name, email, phone)
   - Company details (name, size, industry, job title)
   - Current software and business challenges
   - Scheduling preferences (date and time)
   - GDPR-compliant consent checkbox
   - Real-time validation using Zod schema

2. **API Endpoint (`/api/demo`)**
   - Secure data validation
   - Request ID generation
   - Email notification system (template ready)
   - Error handling and proper HTTP responses
   - Console logging for debugging

3. **Email Templates**
   - Customer confirmation email
   - Sales team notification email
   - Professional HTML templates with all request details

4. **Success/Error Handling**
   - Toast notifications for user feedback
   - Success page with next steps
   - Graceful error handling
   - Form reset after successful submission

## Production Setup

### 1. Email Service Configuration

Choose one of these email providers and add the corresponding environment variables to your `.env.local` file:

#### Option A: Resend (Recommended)
```bash
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
RESEND_DOMAIN=yourdomain.com
```

#### Option B: SendGrid
```bash
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

#### Option C: AWS SES
```bash
AWS_ACCESS_KEY_ID=AKIAXXXXXXXXXXXXXXXXX
AWS_SECRET_ACCESS_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
AWS_REGION=us-east-1
```

### 2. Enable Email Sending

In `/src/app/api/demo/route.ts`, uncomment and configure the email sending code:

```typescript
// Uncomment this section and configure for your email provider
const emailResponses = await Promise.allSettled([
  // Customer confirmation email
  fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: `OilFlow BIDEC <noreply@yourdomain.com>`,
      to: [data.email],
      subject: 'Demo Request Confirmation - OilFlow BIDEC ERP',
      html: customerEmailContent,
    }),
  }),
  // ... sales team notification
]);
```

### 3. Database Integration (Optional)

For production, consider storing demo requests in a database:

```typescript
// Example with PostgreSQL
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

await pool.query(`
  INSERT INTO demo_requests 
  (request_id, first_name, last_name, email, phone, company, job_title, 
   company_size, industry, challenges, preferred_date, preferred_time, 
   additional_notes, created_at)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
`, [requestId, data.firstName, data.lastName, ...]);
```

### 4. CRM Integration (Optional)

Integrate with your CRM system:

```typescript
// Example HubSpot integration
await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.HUBSPOT_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    properties: {
      email: data.email,
      firstname: data.firstName,
      lastname: data.lastName,
      company: data.company,
      jobtitle: data.jobTitle,
      // ... other fields
    },
  }),
});
```

## Current Functionality

### Demo Request Flow

1. **User visits `/request-demo`**
   - Comprehensive form with all necessary fields
   - Real-time validation
   - Professional UI/UX

2. **Form submission triggers API call**
   - POST request to `/api/demo`
   - Data validation using Zod
   - Error handling

3. **Server processes request**
   - Generates unique request ID
   - Logs request details
   - Sends email notifications (when configured)
   - Returns success/error response

4. **User receives confirmation**
   - Success toast notification
   - Success page with next steps
   - Professional presentation

### Email Notifications

When properly configured, the system sends:

1. **Customer Confirmation Email**
   - Request details and ID
   - What happens next
   - Contact information
   - Professional branding

2. **Sales Team Notification**
   - All customer details
   - Company information
   - Business challenges
   - Scheduling preferences
   - Request metadata

## Testing

### Local Testing

1. Visit `http://localhost:3009/request-demo`
2. Fill out the form with test data
3. Submit the form
4. Check browser console for logs
5. Verify success message appears

### API Testing

Test the API endpoint directly:

```bash
curl -X POST http://localhost:3009/api/demo \\
  -H "Content-Type: application/json" \\
  -d '{
    "firstName": "John",
    "lastName": "Smith",
    "email": "john@example.com",
    "phone": "+1234567890",
    "company": "Test Corp",
    "jobTitle": "Manager",
    "companySize": "51-200",
    "industry": "petroleum-trading",
    "challenges": "We need better inventory management",
    "preferredDate": "2024-01-15",
    "preferredTime": "morning",
    "consent": true
  }'
```

## Security Considerations

1. **Rate Limiting**: Consider implementing rate limiting for the demo endpoint
2. **CSRF Protection**: Already handled by Next.js
3. **Input Sanitization**: Implemented via Zod validation
4. **Email Security**: Use domain validation for email addresses
5. **Data Privacy**: GDPR-compliant consent collection

## Monitoring and Analytics

Consider adding:

1. **Demo request tracking** in Google Analytics
2. **Conversion funnel analysis**
3. **A/B testing** for form optimization
4. **Alert system** for failed demo submissions

## Support and Maintenance

1. Monitor error logs in production
2. Track email delivery rates
3. Follow up on demo requests within 24 hours
4. Regularly update form fields based on business needs