import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPortfolioItem {
  title: string;
  description?: string;
  imageUrl?: string;
  projectUrl?: string;
  category: string;
}

export interface IFreelancer extends Document {
  _id: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  title: {
    en: string;
    np: string;
  };
  bio: {
    en: string;
    np: string;
  };
  skills: string[];
  hourlyRate: number;
  availability: 'available' | 'busy' | 'not_available';
  experience: 'beginner' | 'intermediate' | 'expert';
  location?: string;
  languages: string[];
  portfolio: IPortfolioItem[];
  completedJobs: number;
  totalEarnings: number;
  rating: number;
  reviewCount: number;
  isVerified: boolean;
  isOnline: boolean;
  lastActive: Date;
  socialLinks?: {
    website?: string;
    linkedin?: string;
    github?: string;
    behance?: string;
    dribbble?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const PortfolioItemSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  imageUrl: {
    type: String,
  },
  projectUrl: {
    type: String,
  },
  category: {
    type: String,
    required: true,
  },
});

const FreelancerSchema: Schema<IFreelancer> = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
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
    bio: {
      en: {
        type: String,
        required: [true, 'English bio is required'],
        trim: true,
        maxlength: [1000, 'Bio cannot be more than 1000 characters'],
      },
      np: {
        type: String,
        required: [true, 'Nepali bio is required'],
        trim: true,
        maxlength: [1000, 'Bio cannot be more than 1000 characters'],
      },
    },
    skills: {
      type: [String],
      required: [true, 'At least one skill is required'],
      validate: {
        validator: function (v: string[]) {
          return v.length > 0 && v.length <= 15;
        },
        message: 'Skills must be between 1 and 15',
      },
    },
    hourlyRate: {
      type: Number,
      required: [true, 'Hourly rate is required'],
      min: [100, 'Hourly rate must be at least Rs. 100'],
    },
    availability: {
      type: String,
      enum: ['available', 'busy', 'not_available'],
      default: 'available',
    },
    experience: {
      type: String,
      enum: ['beginner', 'intermediate', 'expert'],
      default: 'intermediate',
    },
    location: {
      type: String,
      trim: true,
    },
    languages: {
      type: [String],
      default: ['Nepali', 'English'],
    },
    portfolio: {
      type: [PortfolioItemSchema],
      default: [],
    },
    completedJobs: {
      type: Number,
      default: 0,
      min: 0,
    },
    totalEarnings: {
      type: Number,
      default: 0,
      min: 0,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
    lastActive: {
      type: Date,
      default: Date.now,
    },
    socialLinks: {
      website: String,
      linkedin: String,
      github: String,
      behance: String,
      dribbble: String,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for faster queries
FreelancerSchema.index({ skills: 1 });
FreelancerSchema.index({ rating: -1 });
FreelancerSchema.index({ hourlyRate: 1 });
FreelancerSchema.index({ availability: 1 });
FreelancerSchema.index({ isVerified: 1 });

const Freelancer: Model<IFreelancer> =
  mongoose.models.Freelancer || mongoose.model<IFreelancer>('Freelancer', FreelancerSchema);

export default Freelancer;
