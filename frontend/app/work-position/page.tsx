import HomeHeader from '@/components/block/home-header'
import React, { Suspense } from 'react'
import { JobDescriptionHero } from './job-description-hero'
import { ResumeGenerationPanel } from './resume-generation-panel'
import { waitFor } from '@/utils/waitFor'

export default  async  function JobDescriptionPage() {
    await waitFor(2000)
    return (
        <main className="w-full flex flex-col  ">
            <HomeHeader />
            <div className="p-3">
                <ResumeGenerationPanel />
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