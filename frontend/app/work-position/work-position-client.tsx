import { JobDescription } from '@/models/job-desecription'
import React from 'react'
import DeleteJobDescription from './delete-job-description'
import { EditJobDescription } from './edit-job-description'
import { Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent } from '@/components/ui/card'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import CreateJobDescription from '@/app/work-position/create-job-description'

export const WorkPositionClient = ({ jobDescriptions }: { jobDescriptions: JobDescription[] }) => {
    return (

        <div
            className='p-4'
        >


            <div className='flex flex-row justify-between items-center'>
                <CardHeader>
                    <CardTitle>Work Position</CardTitle>
                    <CardDescription>Job Descriptions of the Position You are Targeting</CardDescription>
                </CardHeader>
                <CreateJobDescription />
            </div>
            <div className='grid grid-cols-2 gap-4'>
                {jobDescriptions.map((job) => (
                    <Card key={job.job_id} className='hover:shadow-md transition-shadow'>
                        <CardContent>
                            <div className='flex flex-col gap-2'>
                                <div>
                                    <h1 className='text-lg font-semibold text-gray-800'>{job.title} - {job.company}</h1>
                                </div>
                                <div>
                                    <p className='text-gray-600'>{job.started_at} - {job.ended_at}</p>
                                </div>
                                <div className='flex flex-row gap-2 justify-between'>
                                    <EditJobDescription job={job} />
                                    <DeleteJobDescription jobId={job.job_id} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
