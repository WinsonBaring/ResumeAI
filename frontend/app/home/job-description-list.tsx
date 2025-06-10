import { getJobDescription} from '@/api/getJobDescription';
import { buttonVariants } from '@/components/ui/button';
import { cookies, headers } from 'next/headers';
import { revalidateButton } from "@/api/actions/revalidate";
import React from 'react';
import { ButtonTest } from './button-test';

export const JobDescriptionList = async () => {

    const result = await getJobDescription();
    return (
        <div>
            <ButtonTest/>
            {JSON.stringify(result)}
        </div>
    )
    // const { data, error } = await useJobDescription();

    // if (error) {
    //     return <p className="text-red-500">Failed to load job descriptions.</p>;
    // }

    // if (!data || data.length === 0) {
    //     return <p className="text-gray-500">No job descriptions found.</p>;
    // }

    // return (
    //     <div className="space-y-4">
    //         {data.map((job) => (
    //             <div
    //                 key={job.job_id}
    //                 className="p-4 border rounded-lg shadow-sm bg-white"
    //             >
    //                 <p className="text-lg text-gray-800">
    //                     {job.description || 'No description'}
    //                 </p>
    //                 <p className="text-sm text-gray-500">
    //                     Created: {new Date(job.created_at).toLocaleString()}
    //                 </p>
    //             </div>
    //         ))}
    //     </div>
    // );
};
