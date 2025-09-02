import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const demoRequestSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  company: z.string().min(2),
  jobTitle: z.string().min(2),
  companySize: z.enum(['1-50', '51-200', '201-1000', '1000+']),
  industry: z.enum(['upstream', 'midstream', 'downstream', 'integrated', 'services', 'other']),
  currentSoftware: z.string().optional(),
  challenges: z.string().min(10),
  preferredDate: z.string(),
  preferredTime: z.enum(['morning', 'afternoon', 'flexible']),
  additionalNotes: z.string().optional(),
  consent: z.boolean().refine(val => val === true),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input data
    const validatedData = demoRequestSchema.parse(body);
    
    // Here you would typically:
    // 1. Save to database
    // 2. Send confirmation email
    // 3. Notify sales team
    // 4. Schedule demo in calendar system
    
    console.log('Demo request received:', {
      ...validatedData,
      timestamp: new Date().toISOString(),
      ip: request.headers.get('x-forwarded-for') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
    });

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Send success response
    return NextResponse.json(
      {
        success: true,
        message: 'Demo request submitted successfully',
        requestId: `demo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Demo request error:', error);
    
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
        message: 'Failed to process demo request',
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    {
      message: 'Demo booking API endpoint',
      version: '1.0.0',
      endpoints: {
        POST: 'Submit demo request',
      },
    },
    { status: 200 }
  );
}