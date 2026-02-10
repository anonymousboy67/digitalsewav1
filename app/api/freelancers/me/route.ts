import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Freelancer from '@/models/Freelancer';
import { auth } from '@/lib/auth';

// GET current user's freelancer profile
export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { error: 'You must be logged in' },
        { status: 401 }
      );
    }

    await dbConnect();

    const freelancer = await Freelancer.findOne({ user: session.user.id })
      .populate('user', 'name email image isVerified')
      .lean();

    if (!freelancer) {
      return NextResponse.json(
        { error: 'Freelancer profile not found', hasProfile: false },
        { status: 404 }
      );
    }

    return NextResponse.json({ freelancer, hasProfile: true });
  } catch (error: any) {
    console.error('Error fetching freelancer profile:', error);
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    );
  }
}
