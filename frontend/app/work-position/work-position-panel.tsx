"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Edit, Trash2, Copy, Clock, CheckCircle, Circle } from "lucide-react"
import { WorkPositionModal } from "@/app/work-position/work-position-model"

interface WorkPosition {
    id: string
    title: string
    company: string
    description: string
    dateAdded: string
    lastUsed: string
    isActive: boolean
}

const mockJobDescriptions: WorkPosition[] = [
    {
        id: "1",
        title: "Senior Software Engineer",
        company: "Google",
        description:
            "We are looking for a Senior Software Engineer to join our team. You will be responsible for designing and implementing scalable systems...",
        dateAdded: "2023-10-01",
        lastUsed: "Today",
        isActive: true,
    },
    {
        id: "2",
        title: "Full Stack Developer",
        company: "Meta",
        description:
            "Join our dynamic team as a Full Stack Developer. You will work on cutting-edge web applications using React, Node.js...",
        dateAdded: "2023-09-28",
        lastUsed: "2023-10-15",
        isActive: false,
    },
]

export function WorkPositionPanel() {
    const [jobDescriptions, setJobDescriptions] = useState<WorkPosition[]>(mockJobDescriptions)
    const [searchTerm, setSearchTerm] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingJob, setEditingJob] = useState<WorkPosition | null>(null)

    const filteredJobs = jobDescriptions.filter(
        (job) =>
            job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.description.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    const handleAddNew = () => {
        setEditingJob(null)
        setIsModalOpen(true)
    }

    const handleEdit = (job: WorkPosition) => {
        setEditingJob(job)
        setIsModalOpen(true)
    }

    const handleSave = (job: WorkPosition) => {
        if (editingJob) {
            setJobDescriptions((prev) => prev.map((j) => (j.id === editingJob.id ? job : j)))
        } else {
            setJobDescriptions((prev) => [...prev, { ...job, id: Date.now().toString() }])
        }
        setIsModalOpen(false)
        setEditingJob(null)
    }

    const handleSetActive = (id: string) => {
        setJobDescriptions((prev) =>
            prev.map((job) => ({
                ...job,
                isActive: job.id === id,
            })),
        )
    }

    const handleDelete = (id: string) => {
        setJobDescriptions((prev) => prev.filter((job) => job.id !== id))
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Job Descriptions</h1>
                    <p className="text-gray-600 mt-1">Manage target job postings for resume tailoring</p>
                </div>
                <Button onClick={handleAddNew} className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Job Description
                </Button>
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
                            key={job.id}
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
                                        <Button variant="ghost" size="sm" onClick={() => handleEdit(job)} className="gap-1">
                                            <Edit className="h-3 w-3" />
                                            Edit
                                        </Button>
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
                                            onClick={() => handleSetActive(job.id)}
                                            className="gap-1"
                                            disabled={job.isActive}
                                        >
                                            {job.isActive ? <CheckCircle className="h-3 w-3" /> : <Circle className="h-3 w-3" />}
                                            {job.isActive ? "Active" : "Set Active"}
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleDelete(job.id)}
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
            />
        </div>
    )
}
