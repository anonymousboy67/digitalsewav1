'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface DeleteProjectButtonProps {
  projectId: string;
}

export default function DeleteProjectButton({ projectId }: DeleteProjectButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/projects/${projectId}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to delete project');
      }

      router.push('/projects?deleted=true');
      router.refresh();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
      setShowConfirm(false);
    }
  };

  if (showConfirm) {
    return (
      <div className="flex-1 flex gap-2">
        <button
          onClick={handleDelete}
          disabled={loading}
          className="flex-1 bg-red-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-red-700 disabled:opacity-50 transition-colors"
        >
          {loading ? 'Deleting...' : 'Confirm Delete'}
        </button>
        <button
          onClick={() => setShowConfirm(false)}
          className="px-4 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setShowConfirm(true)}
      className="flex-1 bg-red-100 text-red-600 px-4 py-3 rounded-lg font-semibold hover:bg-red-200 transition-colors"
    >
      Delete Project
    </button>
  );
}
