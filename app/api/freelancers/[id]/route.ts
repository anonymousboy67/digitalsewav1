import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Freelancer from '@/models/Freelancer';
import { auth } from '@/lib/auth';
import mongoose from 'mongoose';

// GET single freelancer by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid freelancer ID' },
        { status: 400 }
      );
    }

    await dbConnect();

    const freelancer = await Freelancer.findById(id)
      .populate('user', 'name email image isVerified')
      .lean();

    if (!freelancer) {
      return NextResponse.json(
        { error: 'Freelancer not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ freelancer });
  } catch (error: any) {
    console.error('Error fetching freelancer:', error);
    return NextResponse.json(
      { error: 'Failed to fetch freelancer' },
      { status: 500 }
    );
  }
}

// PUT - Update freelancer profile
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    const { id } = await params;

    if (!session?.user) {
      return NextResponse.json(
        { error: 'You must be logged in to update your profile' },
        { status: 401 }
      );
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid freelancer ID' },
        { status: 400 }
      );
    }

    await dbConnect();

    // Find the freelancer profile
    const existingFreelancer = await Freelancer.findById(id);

    if (!existingFreelancer) {
      return NextResponse.json(
        { error: 'Freelancer profile not found' },
        { status: 404 }
      );
    }

    // Check if the user is the owner
    if (existingFreelancer.user.toString() !== session.user.id) {
      return NextResponse.json(
        { error: 'You can only update your own profile' },
        { status: 403 }
      );
    }

    const body = await request.json();

    const allowedUpdates = [
      'title',
      'bio',
      'skills',
      'hourlyRate',
      'availability',
      'experience',
      'location',
      'languages',
      'portfolio',
      'socialLinks',
      'isOnline',
    ];

    const updates: any = {};
    for (const key of allowedUpdates) {
      if (body[key] !== undefined) {
        updates[key] = body[key];
      }
    }

    // Update lastActive
    updates.lastActive = new Date();

    const updatedFreelancer = await Freelancer.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    ).populate('user', 'name email image');

    return NextResponse.json({
      message: 'Profile updated successfully',
      freelancer: updatedFreelancer,
    });
  } catch (error: any) {
    console.error('Error updating freelancer:', error);

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e: any) => e.message);
      return NextResponse.json(
        { error: messages.join(', ') },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    );
  }
}

// DELETE - Delete freelancer profile
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    const { id } = await params;

    if (!session?.user) {
      return NextResponse.json(
        { error: 'You must be logged in to delete your profile' },
        { status: 401 }
      );
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid freelancer ID' },
        { status: 400 }
      );
    }

    await dbConnect();

    const freelancer = await Freelancer.findById(id);

    if (!freelancer) {
      return NextResponse.json(
        { error: 'Freelancer profile not found' },
        { status: 404 }
      );
    }

    // Check if the user is the owner
    if (freelancer.user.toString() !== session.user.id) {
      return NextResponse.json(
        { error: 'You can only delete your own profile' },
        { status: 403 }
      );
    }

    await Freelancer.findByIdAndDelete(id);

    return NextResponse.json({
      message: 'Freelancer profile deleted successfully',
    });
  } catch (error: any) {
    console.error('Error deleting freelancer:', error);
    return NextResponse.json(
      { error: 'Failed to delete profile' },
      { status: 500 }
    );
  }
}
