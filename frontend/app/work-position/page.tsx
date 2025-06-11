import HomeHeader from '@/components/block/home-header'
import React from 'react'
import { JobDescriptionHero } from './job-description-hero'
import { ResumeGenerationPanel } from './resume-generation-panel'

export default function JobDescriptionPage() {
    return (
        <main className="w-full flex flex-col  ">
            <HomeHeader />
            <div className="p-3">
                <ResumeGenerationPanel />
            </div>


        </main>
    )
}
