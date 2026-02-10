import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Freelancer from '@/models/Freelancer';
import User from '@/models/User';
import { auth } from '@/lib/auth';

// GET all freelancers (with optional filters)
export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const skill = searchParams.get('skill');
    const availability = searchParams.get('availability');
    const experience = searchParams.get('experience');
    const minRate = searchParams.get('minRate');
    const maxRate = searchParams.get('maxRate');
    const verified = searchParams.get('verified');
    const limit = parseInt(searchParams.get('limit') || '20');
    const page = parseInt(searchParams.get('page') || '1');
    const sort = searchParams.get('sort') || 'rating';

    // Build query
    const query: any = {};

    if (skill) {
      query.skills = { $in: [new RegExp(skill, 'i')] };
    }

    if (availability) {
      query.availability = availability;
    }

    if (experience) {
      query.experience = experience;
    }

    if (minRate || maxRate) {
      query.hourlyRate = {};
      if (minRate) query.hourlyRate.$gte = parseInt(minRate);
      if (maxRate) query.hourlyRate.$lte = parseInt(maxRate);
    }

    if (verified === 'true') {
      query.isVerified = true;
    }

    const skip = (page - 1) * limit;

    // Determine sort order
    let sortOption: any = { rating: -1 };
    switch (sort) {
      case 'rate_low':
        sortOption = { hourlyRate: 1 };
        break;
      case 'rate_high':
        sortOption = { hourlyRate: -1 };
        break;
      case 'jobs':
        sortOption = { completedJobs: -1 };
        break;
      case 'newest':
        sortOption = { createdAt: -1 };
        break;
      default:
        sortOption = { rating: -1, reviewCount: -1 };
    }

    const [freelancers, total] = await Promise.all([
      Freelancer.find(query)
        .populate('user', 'name email image')
        .sort(sortOption)
        .skip(skip)
        .limit(limit)
        .lean(),
      Freelancer.countDocuments(query),
    ]);

    return NextResponse.json({
      freelancers,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    console.error('Error fetching freelancers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch freelancers' },
      { status: 500 }
    );
  }
}

// POST - Create freelancer profile
export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { error: 'You must be logged in to create a profile' },
        { status: 401 }
      );
    }

    // Check if user is a freelancer
    if ((session.user as any).role !== 'freelancer') {
      return NextResponse.json(
        { error: 'Only freelancers can create a freelancer profile' },
        { status: 403 }
      );
    }

    await dbConnect();

    // Check if profile already exists
    const existingProfile = await Freelancer.findOne({ user: session.user.id });
    if (existingProfile) {
      return NextResponse.json(
        { error: 'You already have a freelancer profile. Use PUT to update.' },
        { status: 400 }
      );
    }

    const body = await request.json();

    const {
      title,
      bio,
      skills,
      hourlyRate,
      availability,
      experience,
      location,
      languages,
      socialLinks,
    } = body;

    // Validate required fields
    if (!title?.en || !title?.np) {
      return NextResponse.json(
        { error: 'Both English and Nepali titles are required' },
        { status: 400 }
      );
    }

    if (!bio?.en || !bio?.np) {
      return NextResponse.json(
        { error: 'Both English and Nepali bios are required' },
        { status: 400 }
      );
    }

    if (!skills || skills.length === 0) {
      return NextResponse.json(
        { error: 'At least one skill is required' },
        { status: 400 }
      );
    }

    if (!hourlyRate || hourlyRate < 100) {
      return NextResponse.json(
        { error: 'Hourly rate must be at least Rs. 100' },
        { status: 400 }
      );
    }

    // Create the freelancer profile
    const freelancer = await Freelancer.create({
      user: session.user.id,
      title,
      bio,
      skills,
      hourlyRate,
      availability: availability || 'available',
      experience: experience || 'intermediate',
      location,
      languages: languages || ['Nepali', 'English'],
      socialLinks,
    });

    const populatedFreelancer = await Freelancer.findById(freelancer._id)
      .populate('user', 'name email image')
      .lean();

    return NextResponse.json(
      {
        message: 'Freelancer profile created successfully',
        freelancer: populatedFreelancer,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating freelancer profile:', error);

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e: any) => e.message);
      return NextResponse.json(
        { error: messages.join(', ') },
        { status: 400 }
      );
    }

    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'You already have a freelancer profile' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create freelancer profile' },
      { status: 500 }
    );
  }
}
