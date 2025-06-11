import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { JOB_DESCRIPTION, RESUME, WORK_EXPERIENCE } from "@/const/variables"
import { JobDescriptionHero } from "@/app/home/job-description/job-description-hero"
import { WorkExperienceHero } from "@/app/home/work-experience/work-description-hero"
import { ResumeHero } from "@/app/home/resume/resume-hero"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getResume } from "@/api/get-resume"
// import CreateResume from "./resume/create-resume"
import { ResumeHeader } from "@/app/home/resume/resume-header"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import { ResumeOpen } from "@/app/home/resume/resume-open"

export default async function HomeHero() {
    const resume = await getResume();
    return (
        // <Tabs defaultValue={JOB_DESCRIPTION}>
        //     <TabsList>
        //         <TabsTrigger value={RESUME} className="mx-4">{RESUME}</TabsTrigger>
        //         <TabsTrigger value={JOB_DESCRIPTION} className="mx-4">{JOB_DESCRIPTION}</TabsTrigger>
        //         <TabsTrigger value={WORK_EXPERIENCE} className="mx-4">{WORK_EXPERIENCE}</TabsTrigger>
        //     </TabsList>
        //     <TabsContent value={RESUME}>
        //         <ResumeHero />
        //     </TabsContent>
        //     <TabsContent value={JOB_DESCRIPTION}>
        //         <JobDescriptionHero />
        //     </TabsContent>
        //     <TabsContent value={WORK_EXPERIENCE}>
        //         <WorkExperienceHero/>
        //     </TabsContent>
        // </Tabs>

        <div className="p-2 flex flex-col space-y-2 ">

            <div
                className="flex flex-row w-full h-full items-end justify-between"
            >
                <ResumeHeader />

            </div>
            <Card>
                <Table>
                    <TableCaption>All list of resume</TableCaption>
                    <TableHeader>

                        <TableRow>

                            <TableHead>Title</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {resume.data?.map((resume) => {
                            return (
                                <TableRow key={resume.id}>

                                    <TableCell>{resume.title}</TableCell>
                                    <TableCell>{resume.description}</TableCell>
                                    {/* <Button
                                        variant={"link"}
                                    >
                                        <Link href={`resume/${resume.id}`}>
                                            Open
                                        </Link>
                                    </Button> */}

                                    <ResumeOpen id={resume.id!} />
                                </TableRow>
                            )
                        })}

                    </TableBody>



                </Table>

            </Card>
        </div>
    )
}