import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { JOB_DESCRIPTION, WORK_EXPERIENCE } from "@/const/variables"

import {JobDescriptionHero}from "@/components/block/job-description-content"
import WorkExperience from "@/components/block/work-experience-content"
export default function HomeHero() {
    return (
        <Tabs defaultValue={JOB_DESCRIPTION}>
            <TabsList>
                <TabsTrigger value={JOB_DESCRIPTION} className="mx-4">{JOB_DESCRIPTION}</TabsTrigger>
                <TabsTrigger value={WORK_EXPERIENCE} className="mx-4">{WORK_EXPERIENCE}</TabsTrigger>
            </TabsList>
            <TabsContent value={JOB_DESCRIPTION}>
                <JobDescriptionHero />
            </TabsContent>
            <TabsContent value={WORK_EXPERIENCE}>
                {/* <WorkExperience /> */}
            </TabsContent>
        </Tabs>
    )
}