import { Card } from "@/components/ui/card"
import { getResume } from "@/api/get-resume"
// import CreateResume from "./resume/create-resume"
import { ResumeHeader } from "@/app/home/resume/resume-header"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ResumeOpen } from "@/app/home/resume/resume-open"
import { getQueryClient } from "@/providers/ReactQueryProvider"
import { useQuery } from "@tanstack/react-query"
import { waitFor } from "@/utils/waitFor"

export default async function HomeHero() {
    // const { data:resume,isLoading } = useQuery({
    //     queryKey: ['posts'],
    //     queryFn: () => getResume(),
    //   })
    // await waitFor(2000);
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
                        {/* {isLoading && (
                            <div>
                                fetching data
                            </div>
                        )} */}
                        {resume?.data?.map((resume) => {
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