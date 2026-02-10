# DigitalSewa - Nepal's Creative Collaboration Platform

A bilingual (English/Nepali) freelance marketplace platform built with Next.js, connecting clients with talented freelancers across Nepal.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) |
| Frontend | React 19, TypeScript |
| Styling | Tailwind CSS 4 |
| Authentication | NextAuth v5 (Auth.js) |
| Database | MongoDB + Mongoose |
| Password Hashing | bcryptjs |

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB Atlas account (or local MongoDB)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd digitalsewav1
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:

   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>
   NEXTAUTH_SECRET=your-secret-key-here
   NEXTAUTH_URL=http://localhost:3000
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000)

## Features

### Authentication System

- **User Registration** - Sign up as Client or Freelancer
- **User Login** - Secure login with credentials
- **Session Management** - JWT-based sessions
- **Role-Based Access** - Different features for clients and freelancers
- **Password Security** - bcrypt hashing

### Project Management (CRUD)

Clients can:
- **Create Projects** - Post new projects with bilingual details
- **View Projects** - Browse all open projects
- **Update Projects** - Edit their own projects
- **Delete Projects** - Remove their projects
- **Manage Projects** - View all their posted projects

### Freelancer Profiles (CRUD)

Freelancers can:
- **Create Profile** - Set up professional profile
- **View Profile** - See their public profile
- **Update Profile** - Edit profile details
- **Delete Profile** - Remove their profile

Profile includes:
- Bilingual title and bio
- Skills (up to 15)
- Hourly rate
- Experience level
- Availability status
- Location and languages
- Social links
- Portfolio items

## Project Structure

```
digitalsewav1/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── auth/
│   │   │   ├── [...nextauth]/    # NextAuth handler
│   │   │   └── register/         # User registration
│   │   ├── projects/             # Project CRUD
│   │   │   ├── route.ts          # GET all, POST new
│   │   │   └── [id]/route.ts     # GET, PUT, DELETE
│   │   └── freelancers/          # Freelancer CRUD
│   │       ├── route.ts          # GET all, POST new
│   │       ├── me/route.ts       # Current user's profile
│   │       └── [id]/route.ts     # GET, PUT, DELETE
│   ├── login/                    # Login page
│   ├── signup/                   # Signup page
│   ├── dashboard/                # User dashboard
│   ├── projects/                 # Projects pages
│   │   ├── page.tsx              # Browse projects
│   │   ├── new/page.tsx          # Post new project
│   │   └── [id]/page.tsx         # Project details
│   ├── freelancers/              # Freelancers pages
│   │   ├── page.tsx              # Browse freelancers
│   │   └── [id]/page.tsx         # Freelancer details
│   ├── profile/                  # Profile pages
│   │   ├── page.tsx              # View profile
│   │   ├── create/page.tsx       # Create profile
│   │   └── edit/page.tsx         # Edit profile
│   ├── my-projects/              # Client's projects
│   └── layout.tsx                # Root layout with AuthProvider
├── components/                   # React components
│   └── providers/
│       └── AuthProvider.tsx      # Session provider
├── lib/                          # Utilities
│   ├── auth.ts                   # NextAuth configuration
│   └── mongodb.ts                # Database connection
├── models/                       # Mongoose models
│   ├── User.ts                   # User schema
│   ├── Project.ts                # Project schema
│   └── Freelancer.ts             # Freelancer schema
└── types/                        # TypeScript types
    └── next-auth.d.ts            # NextAuth type extensions
```

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/[...nextauth]` | NextAuth handlers (login, logout, session) |

### Projects

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/projects` | Get all projects (with filters) |
| POST | `/api/projects` | Create new project (clients only) |
| GET | `/api/projects/[id]` | Get single project |
| PUT | `/api/projects/[id]` | Update project (owner only) |
| DELETE | `/api/projects/[id]` | Delete project (owner only) |

**Query Parameters for GET /api/projects:**
- `category` - Filter by category (design, video, photography, music, web, writing)
- `status` - Filter by status (open, in_progress, completed, cancelled)
- `skill` - Filter by required skill
- `clientId` - Filter by client
- `limit` - Results per page (default: 20)
- `page` - Page number (default: 1)

### Freelancers

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/freelancers` | Get all freelancers (with filters) |
| POST | `/api/freelancers` | Create profile (freelancers only) |
| GET | `/api/freelancers/me` | Get current user's profile |
| GET | `/api/freelancers/[id]` | Get single freelancer |
| PUT | `/api/freelancers/[id]` | Update profile (owner only) |
| DELETE | `/api/freelancers/[id]` | Delete profile (owner only) |

**Query Parameters for GET /api/freelancers:**
- `skill` - Filter by skill
- `experience` - Filter by level (beginner, intermediate, expert)
- `availability` - Filter by availability
- `minRate` / `maxRate` - Filter by hourly rate
- `verified` - Filter verified only (true/false)
- `sort` - Sort by (rating, rate_low, rate_high, jobs, newest)
- `limit` - Results per page (default: 20)
- `page` - Page number (default: 1)

## Database Models

### User Schema

```typescript
{
  name: string,
  email: string (unique),
  password: string (hashed),
  phone?: string,
  role: 'client' | 'freelancer',
  image?: string,
  isVerified: boolean,
  kycStatus: 'pending' | 'submitted' | 'verified' | 'rejected',
  createdAt: Date,
  updatedAt: Date
}
```

### Project Schema

```typescript
{
  title: { en: string, np: string },
  description: { en: string, np: string },
  budget: number,
  deadline: string,
  skills: string[],
  category: string,
  isUrgent: boolean,
  status: 'open' | 'in_progress' | 'completed' | 'cancelled',
  difficulty: 'beginner' | 'intermediate' | 'expert',
  location?: string,
  client: ObjectId (ref: User),
  assignedFreelancer?: ObjectId (ref: User),
  proposals: ObjectId[] (ref: Proposal),
  createdAt: Date,
  updatedAt: Date
}
```

### Freelancer Schema

```typescript
{
  user: ObjectId (ref: User),
  title: { en: string, np: string },
  bio: { en: string, np: string },
  skills: string[],
  hourlyRate: number,
  availability: 'available' | 'busy' | 'not_available',
  experience: 'beginner' | 'intermediate' | 'expert',
  location?: string,
  languages: string[],
  portfolio: PortfolioItem[],
  completedJobs: number,
  totalEarnings: number,
  rating: number,
  reviewCount: number,
  isVerified: boolean,
  isOnline: boolean,
  lastActive: Date,
  socialLinks?: {
    website?: string,
    linkedin?: string,
    github?: string,
    behance?: string,
    dribbble?: string
  },
  createdAt: Date,
  updatedAt: Date
}
```

## Pages

| Route | Description | Access |
|-------|-------------|--------|
| `/` | Home page | Public |
| `/login` | User login | Public |
| `/signup` | User registration | Public |
| `/dashboard` | User dashboard | Authenticated |
| `/projects` | Browse all projects | Public |
| `/projects/new` | Post new project | Client only |
| `/projects/[id]` | Project details | Public |
| `/my-projects` | Manage my projects | Client only |
| `/freelancers` | Browse freelancers | Public |
| `/freelancers/[id]` | Freelancer details | Public |
| `/profile` | View own profile | Authenticated |
| `/profile/create` | Create freelancer profile | Freelancer only |
| `/profile/edit` | Edit freelancer profile | Freelancer only |

## User Roles

### Client
- Post and manage projects
- Browse freelancers
- View project proposals (coming soon)
- Hire freelancers (coming soon)

### Freelancer
- Create and manage profile
- Browse projects
- Submit proposals (coming soon)
- Manage ongoing work (coming soon)

## Future Enhancements

- [ ] Proposal/Bidding System
- [ ] Messaging System
- [ ] Payment Integration (Khalti/eSewa)
- [ ] File Uploads (Cloudinary)
- [ ] Email Verification
- [ ] Password Reset
- [ ] Admin Dashboard
- [ ] Reviews & Ratings
- [ ] Real-time Notifications

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB connection string | Yes |
| `NEXTAUTH_SECRET` | Secret for JWT signing | Yes |
| `NEXTAUTH_URL` | Application URL | Yes |

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is private and proprietary.

---

Made with love in Nepal
