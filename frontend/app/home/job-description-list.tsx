import { useJobDescription } from '@/api/useJobDescription';
import React from 'react';

export const JobDescriptionList = async () => {
    const { data, error } = await useJobDescription();

    if (error) {
        return <p className="text-red-500">Failed to load job descriptions.</p>;
    }

    if (!data || data.length === 0) {
        return <p className="text-gray-500">No job descriptions found.</p>;
    }

    return (
        <div className="space-y-4">
            {data.map((job) => (
                <div
                    key={job.job_id}
                    className="p-4 border rounded-lg shadow-sm bg-white"
                >
                    <p className="text-lg text-gray-800">
                        {job.description || 'No description'}
                    </p>
                    <p className="text-sm text-gray-500">
                        Created: {new Date(job.created_at).toLocaleString()}
                    </p>
                </div>
            ))}
        </div>
    );
};
