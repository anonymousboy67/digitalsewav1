import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';
import { auth } from '@/lib/auth';
import mongoose from 'mongoose';

// GET single project by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid project ID' },
        { status: 400 }
      );
    }

    await dbConnect();

    const project = await Project.findById(id)
      .populate('client', 'name email image')
      .populate('assignedFreelancer', 'name email image')
      .lean();

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ project });
  } catch (error: any) {
    console.error('Error fetching project:', error);
    return NextResponse.json(
      { error: 'Failed to fetch project' },
      { status: 500 }
    );
  }
}

// PUT - Update project
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    const { id } = await params;

    if (!session?.user) {
      return NextResponse.json(
        { error: 'You must be logged in to update a project' },
        { status: 401 }
      );
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid project ID' },
        { status: 400 }
      );
    }

    await dbConnect();

    // Find the project and check ownership
    const existingProject = await Project.findById(id);

    if (!existingProject) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    // Check if the user is the owner
    if (existingProject.client.toString() !== session.user.id) {
      return NextResponse.json(
        { error: 'You can only update your own projects' },
        { status: 403 }
      );
    }

    // Don't allow updates if project is in progress or completed
    if (existingProject.status === 'in_progress' || existingProject.status === 'completed') {
      return NextResponse.json(
        { error: 'Cannot update a project that is in progress or completed' },
        { status: 400 }
      );
    }

    const body = await request.json();

    const allowedUpdates = [
      'title',
      'description',
      'budget',
      'deadline',
      'skills',
      'category',
      'isUrgent',
      'difficulty',
      'location',
      'status',
    ];

    const updates: any = {};
    for (const key of allowedUpdates) {
      if (body[key] !== undefined) {
        updates[key] = body[key];
      }
    }

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    ).populate('client', 'name email');

    return NextResponse.json({
      message: 'Project updated successfully',
      project: updatedProject,
    });
  } catch (error: any) {
    console.error('Error updating project:', error);

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e: any) => e.message);
      return NextResponse.json(
        { error: messages.join(', ') },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    );
  }
}

// DELETE - Delete project
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    const { id } = await params;

    if (!session?.user) {
      return NextResponse.json(
        { error: 'You must be logged in to delete a project' },
        { status: 401 }
      );
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid project ID' },
        { status: 400 }
      );
    }

    await dbConnect();

    const project = await Project.findById(id);

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    // Check if the user is the owner
    if (project.client.toString() !== session.user.id) {
      return NextResponse.json(
        { error: 'You can only delete your own projects' },
        { status: 403 }
      );
    }

    // Don't allow deletion if project is in progress
    if (project.status === 'in_progress') {
      return NextResponse.json(
        { error: 'Cannot delete a project that is in progress' },
        { status: 400 }
      );
    }

    await Project.findByIdAndDelete(id);

    return NextResponse.json({
      message: 'Project deleted successfully',
    });
  } catch (error: any) {
    console.error('Error deleting project:', error);
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}
