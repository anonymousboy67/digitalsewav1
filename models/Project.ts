import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProject extends Document {
  _id: mongoose.Types.ObjectId;
  title: {
    en: string;
    np: string;
  };
  description: {
    en: string;
    np: string;
  };
  budget: number;
  deadline: string;
  skills: string[];
  category: string;
  isUrgent: boolean;
  status: 'open' | 'in_progress' | 'completed' | 'cancelled';
  difficulty: 'beginner' | 'intermediate' | 'expert';
  location?: string;
  client: mongoose.Types.ObjectId;
  assignedFreelancer?: mongoose.Types.ObjectId;
  proposals: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema: Schema<IProject> = new Schema(
  {
    title: {
      en: {
        type: String,
        required: [true, 'English title is required'],
        trim: true,
        maxlength: [100, 'Title cannot be more than 100 characters'],
      },
      np: {
        type: String,
        required: [true, 'Nepali title is required'],
        trim: true,
        maxlength: [100, 'Title cannot be more than 100 characters'],
      },
    },
    description: {
      en: {
        type: String,
        required: [true, 'English description is required'],
        trim: true,
        maxlength: [2000, 'Description cannot be more than 2000 characters'],
      },
      np: {
        type: String,
        required: [true, 'Nepali description is required'],
        trim: true,
        maxlength: [2000, 'Description cannot be more than 2000 characters'],
      },
    },
    budget: {
      type: Number,
      required: [true, 'Budget is required'],
      min: [100, 'Budget must be at least Rs. 100'],
    },
    deadline: {
      type: String,
      required: [true, 'Deadline is required'],
      trim: true,
    },
    skills: {
      type: [String],
      required: [true, 'At least one skill is required'],
      validate: {
        validator: function (v: string[]) {
          return v.length > 0;
        },
        message: 'At least one skill is required',
      },
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['design', 'video', 'photography', 'music', 'web', 'writing', 'other'],
      default: 'other',
    },
    isUrgent: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['open', 'in_progress', 'completed', 'cancelled'],
      default: 'open',
    },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'expert'],
      default: 'intermediate',
    },
    location: {
      type: String,
      trim: true,
    },
    client: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Client is required'],
    },
    assignedFreelancer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    proposals: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Proposal',
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
ProjectSchema.index({ status: 1, createdAt: -1 });
ProjectSchema.index({ client: 1 });
ProjectSchema.index({ category: 1 });
ProjectSchema.index({ skills: 1 });

const Project: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);

export default Project;
