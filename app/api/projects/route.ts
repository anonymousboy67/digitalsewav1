import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';
import { auth } from '@/lib/auth';

// GET all projects (with optional filters)
export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const status = searchParams.get('status');
    const skill = searchParams.get('skill');
    const clientId = searchParams.get('clientId');
    const limit = parseInt(searchParams.get('limit') || '20');
    const page = parseInt(searchParams.get('page') || '1');

    // Build query
    const query: any = {};

    if (category && category !== 'all') {
      query.category = category;
    }

    if (status) {
      query.status = status;
    } else {
      // Default to open projects for public listing
      query.status = 'open';
    }

    if (skill) {
      query.skills = { $in: [skill] };
    }

    if (clientId) {
      query.client = clientId;
    }

    const skip = (page - 1) * limit;

    const [projects, total] = await Promise.all([
      Project.find(query)
        .populate('client', 'name email')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Project.countDocuments(query),
    ]);

    return NextResponse.json({
      projects,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

// POST - Create new project
export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { error: 'You must be logged in to post a project' },
        { status: 401 }
      );
    }

    // Check if user is a client
    if ((session.user as any).role !== 'client') {
      return NextResponse.json(
        { error: 'Only clients can post projects' },
        { status: 403 }
      );
    }

    await dbConnect();

    const body = await request.json();

    const {
      title,
      description,
      budget,
      deadline,
      skills,
      category,
      isUrgent,
      difficulty,
      location,
    } = body;

    // Validate required fields
    if (!title?.en || !title?.np) {
      return NextResponse.json(
        { error: 'Both English and Nepali titles are required' },
        { status: 400 }
      );
    }

    if (!description?.en || !description?.np) {
      return NextResponse.json(
        { error: 'Both English and Nepali descriptions are required' },
        { status: 400 }
      );
    }

    if (!budget || budget < 100) {
      return NextResponse.json(
        { error: 'Budget must be at least Rs. 100' },
        { status: 400 }
      );
    }

    if (!deadline) {
      return NextResponse.json(
        { error: 'Deadline is required' },
        { status: 400 }
      );
    }

    if (!skills || skills.length === 0) {
      return NextResponse.json(
        { error: 'At least one skill is required' },
        { status: 400 }
      );
    }

    // Create the project
    const project = await Project.create({
      title,
      description,
      budget,
      deadline,
      skills,
      category: category || 'other',
      isUrgent: isUrgent || false,
      difficulty: difficulty || 'intermediate',
      location,
      client: session.user.id,
      status: 'open',
    });

    return NextResponse.json(
      {
        message: 'Project created successfully',
        project,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating project:', error);

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e: any) => e.message);
      return NextResponse.json(
        { error: messages.join(', ') },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
}
