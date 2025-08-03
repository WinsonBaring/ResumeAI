import HomeHeader from '@/components/block/home-header'
import React, { Suspense } from 'react'

// import { ResumeGenerationPanel } from './resume-generation-panel'
import { WorkPositionPanel } from "@/app/work-position/work-position-panel"
import { waitFor } from '@/utils/waitFor'

export default function JobDescriptionPage() {
    return (
        <main className="w-full flex flex-col  ">
            
            <HomeHeader />
            <div className="p-3">
                <WorkPositionPanel />
            </div>
        </main>
    )
}

// export default async function Page  () {
//     return (
//         <Suspense fallback={
//             <p>Loading</p>
//         }>
//             <JobDescriptionPage />
//         </Suspense>
//     )
// }