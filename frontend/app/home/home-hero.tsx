import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { JOB_DESCRIPTION, TESTING_PAGE, WORK_EXPERIENCE } from "@/const/variables"
import {JobDescriptionHero}from "@/app/home/job-description/job-description-hero"
import {WorkExperienceHero} from "@/app/home/work-experience/work-description-hero"

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
                <WorkExperienceHero/>
            </TabsContent>
        </Tabs>
    )
}