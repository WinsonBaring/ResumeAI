"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
    Plus,
    Search,
    Edit,
    Copy,
    Clock,
    CheckCircle,
    Circle,
    Trash2
} from "lucide-react"
import { WorkPositionModal } from "./work-position-model"
import { Database } from "@/utils/supabase/database.types"
import { format } from "date-fns"
import { saveJobDescription, updateJobDescription, deleteJobDescription } from "@/api/actions/save-job-description"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useResumeId } from "@/hooks/use-resume-id"
import { EditJobDescription } from "./edit-job-description"
import CreateJobDescription from "./create-job-description"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

type JobDescription = Database['public']['Tables']['Job Description']['Row'] & {
    isActive?: boolean
    dateAdded?: string
}

interface WorkPositionClientProps {
    initialJobDescriptions: JobDescription[]
}

export function WorkPositionClient({ initialJobDescriptions }: WorkPositionClientProps) {
    const router = useRouter()
    const { resumeId, loading: resumeLoading } = useResumeId()
    const [jobDescriptions, setJobDescriptions] = useState<JobDescription[]>(
        initialJobDescriptions.map(job => ({
            ...job,
            isActive: false,
            dateAdded: format(new Date(job.created_at), 'MMM dd, yyyy'),
            lastUsed: job.lastUsed ? format(new Date(job.lastUsed), 'MMM dd, yyyy') : 'Never'
        }))
    )
    const [searchTerm, setSearchTerm] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingJob, setEditingJob] = useState<JobDescription | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const filteredJobs = jobDescriptions.filter(
        (job) =>
            (job.title?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
            (job.company?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
            (job.description?.toLowerCase().includes(searchTerm.toLowerCase()) || false),
    )

    const handleAddNew = () => {
        setEditingJob(null)
        setIsModalOpen(true)
    }

    const handleEdit = (job: JobDescription) => {
        setEditingJob(job)
        setIsModalOpen(true)
    }

    const handleSave = async (job: JobDescription) => {
        setIsLoading(true)
        try {
            if (editingJob) {
                // Update existing job
                const result = await updateJobDescription(editingJob.job_id, {
                    title: job.title || '',
                    company: job.company || '',
                    description: job.description || '',
                    resume_id: resumeId || 1
                })

                if (result.success) {
                    setJobDescriptions((prev) => prev.map((j) => (j.job_id === editingJob.job_id ? { ...job, ...result.data } : j)))
                    toast.success('Job description updated successfully!')
                } else {
                    toast.error(result.error || 'Failed to update job description')
                }
            } else {
                // Create new job
                const result = await saveJobDescription({
                    title: job.title || '',
                    company: job.company || '',
                    description: job.description || '',
                    resume_id: resumeId || 1
                })

                if (result.success) {
                    const newJob = {
                        ...job,
                        ...result.data,
                        isActive: false,
                        dateAdded: format(new Date(), 'MMM dd, yyyy'),
                        lastUsed: 'Never'
                    }
                    setJobDescriptions((prev) => [...prev, newJob])
                    toast.success('Job description saved successfully!')
                } else {
                    toast.error(result.error || 'Failed to save job description')
                }
            }

            setIsModalOpen(false)
            setEditingJob(null)
            router.refresh() // Refresh the page to get updated data
        } catch (error) {
            console.error('Save error:', error)
            toast.error('An unexpected error occurred')
        } finally {
            setIsLoading(false)
        }
    }

    const handleSetActive = (id: number) => {
        setJobDescriptions((prev) =>
            prev.map((job) => ({
                ...job,
                isActive: job.job_id === id,
            })),
        )
    }

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this job description?')) {
            return
        }

        setIsLoading(true)
        try {
            const result = await deleteJobDescription(id)

            if (result.success) {
                setJobDescriptions((prev) => prev.filter((job) => job.job_id !== id))
                toast.success('Job description deleted successfully!')
                router.refresh() // Refresh the page to get updated data
            } else {
                toast.error(result.error || 'Failed to delete job description')
            }
        } catch (error) {
            console.error('Delete error:', error)
            toast.error('An unexpected error occurred')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Job Descriptions</h1>
                    <p className="text-gray-600 mt-1">Manage target job postings for resume tailoring</p>
                </div>
                <Dialog>
                    <DialogTrigger>
                        <Button className="gap-2">
                            <Plus className="h-4 w-4" />
                            Add Job Description
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <CreateJobDescription />
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                        placeholder="Search JDs by title, company, or tags..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                </div>
            </div>

            {filteredJobs.length === 0 ? (
                <Card className="p-12 text-center">
                    <div className="space-y-4">
                        <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                            <Plus className="h-8 w-8 text-gray-400" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">No job descriptions saved</h3>
                            <p className="text-gray-600">Paste one to begin tailoring your resume!</p>
                        </div>
                        <Button onClick={handleAddNew} className="gap-2">
                            <Plus className="h-4 w-4" />
                            Add Your First Job Description
                        </Button>
                    </div>
                </Card>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {filteredJobs.map((job) => (
                        <Card
                            key={job.job_id}
                            className={`hover:shadow-md transition-shadow ${job.isActive ? "ring-2 ring-blue-500" : ""}`}
                        >
                            <CardHeader className="pb-3">
                                <div className="flex items-start justify-between">
                                    <div className="space-y-1">
                                        <h3 className="font-semibold text-lg leading-tight">
                                            {job.title} - {job.company}
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            Added: {job.dateAdded} | Last Used: {job.lastUsed}
                                        </p>
                                    </div>
                                    {job.isActive && <Badge className="bg-green-100 text-green-800">Currently Active</Badge>}
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-sm text-gray-700 line-clamp-3">{job.description}</p>

                                <div className="flex items-center justify-between pt-2">
                                    <div className="flex items-center gap-2">
                                        {/* <Button variant="ghost" size="sm" onClick={() => handleEdit(job)} className="gap-1">
                                            <Edit className="h-3 w-3" />
                                            Edit
                                        </Button> */}
                                        <EditJobDescription description={job.description || ""} />
                                        <Button variant="ghost" size="sm" className="gap-1">
                                            <Copy className="h-3 w-3" />
                                            Duplicate
                                        </Button>
                                        <Button variant="ghost" size="sm" className="gap-1">
                                            <Clock className="h-3 w-3" />
                                            History
                                        </Button>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant={job.isActive ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => handleSetActive(job.job_id)}
                                            className="gap-1"
                                            disabled={job.isActive}
                                        >
                                            {job.isActive ? <CheckCircle className="h-3 w-3" /> : <Circle className="h-3 w-3" />}
                                            {job.isActive ? "Active" : "Set Active"}
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleDelete(job.job_id)}
                                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                        >
                                            <Trash2 className="h-3 w-3" />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            <WorkPositionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                jobDescription={editingJob}
                isLoading={isLoading}
                resumeId={resumeId || undefined}
            />
        </div>
    )
} 