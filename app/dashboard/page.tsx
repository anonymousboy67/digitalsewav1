import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import SignOutButton from './SignOutButton';

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-red-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome, {session.user.name}!
              </h1>
              <p className="text-gray-600 mt-1">स्वागत छ, {session.user.name}!</p>
            </div>
            <SignOutButton />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Profile Info</h2>
              <div className="space-y-3">
                <div>
                  <span className="text-gray-600">Email:</span>
                  <p className="font-medium">{session.user.email}</p>
                </div>
                <div>
                  <span className="text-gray-600">Role:</span>
                  <p className="font-medium capitalize">{(session.user as any).role || 'User'}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Link
                  href="/projects"
                  className="block w-full text-center py-2 px-4 bg-white rounded-lg border border-gray-200 hover:border-red-300 hover:bg-red-50 transition-colors"
                >
                  Browse Projects
                </Link>
                <Link
                  href="/freelancers"
                  className="block w-full text-center py-2 px-4 bg-white rounded-lg border border-gray-200 hover:border-red-300 hover:bg-red-50 transition-colors"
                >
                  Find Freelancers
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
