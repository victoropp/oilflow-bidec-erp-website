import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const contactFormSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  company: z.string().min(2),
  jobTitle: z.string().min(2),
  subject: z.enum(['general', 'sales', 'support', 'partnership', 'media']),
  message: z.string().min(10),
  consent: z.boolean().refine(val => val === true),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input data
    const validatedData = contactFormSchema.parse(body);
    
    // Here you would typically:
    // 1. Save to CRM system
    // 2. Send confirmation email
    // 3. Route to appropriate team
    // 4. Trigger follow-up workflows
    
    console.log('Contact form submission:', {
      ...validatedData,
      timestamp: new Date().toISOString(),
      ip: request.headers.get('x-forwarded-for') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
    });

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Send success response
    return NextResponse.json(
      {
        success: true,
        message: 'Contact form submitted successfully',
        requestId: `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid input data',
          errors: error.errors,
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to process contact form',
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    {
      message: 'Contact form API endpoint',
      version: '1.0.0',
      endpoints: {
        POST: 'Submit contact form',
      },
    },
    { status: 200 }
  );
}