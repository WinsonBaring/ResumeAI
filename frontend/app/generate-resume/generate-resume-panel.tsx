"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Eye, Edit, Download, Copy, Trash2, Star, FileText, Calendar } from "lucide-react"

interface Resume {
    id: string
    name: string
    associatedJob: string
    dateGenerated: string
    lastModified: string
    versions: number
    isFavorite: boolean
    status: "draft" | "sent" | "final"
}

const mockResumes: Resume[] = [
    {
        id: "1",
        name: "Software Engineer - Google - V3",
        associatedJob: "Senior SE - Google",
        dateGenerated: "2023-10-20",
        lastModified: "2023-10-26",
        versions: 3,
        isFavorite: true,
        status: "final",
    },
    {
        id: "2",
        name: "Marketing Manager - Startup X - Final",
        associatedJob: "Marketing Manager - Startup X",
        dateGenerated: "2023-10-18",
        lastModified: "2023-10-18",
        versions: 1,
        isFavorite: false,
        status: "sent",
    },
    {
        id: "3",
        name: "Full Stack Developer - Meta - Draft",
        associatedJob: "Full Stack Developer - Meta",
        dateGenerated: "2023-10-15",
        lastModified: "2023-10-16",
        versions: 2,
        isFavorite: false,
        status: "draft",
    },
]

export function GeneratedResumesPanel() {
    const [resumes, setResumes] = useState<Resume[]>(mockResumes)
    const [searchTerm, setSearchTerm] = useState("")

    const filteredResumes = resumes.filter(
        (resume) =>
            resume.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            resume.associatedJob.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    const handleToggleFavorite = (id: string) => {
        setResumes((prev) =>
            prev.map((resume) => (resume.id === id ? { ...resume, isFavorite: !resume.isFavorite } : resume)),
        )
    }

    const handleDelete = (id: string) => {
        setResumes((prev) => prev.filter((resume) => resume.id !== id))
    }

    const getStatusColor = (status: Resume["status"]) => {
        switch (status) {
            case "draft":
                return "bg-yellow-100 text-yellow-800"
            case "sent":
                return "bg-blue-100 text-blue-800"
            case "final":
                return "bg-green-100 text-green-800"
            default:
                return "bg-gray-100 text-gray-800"
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Generated Resumes</h1>
                    <p className="text-gray-600 mt-1">Manage, compare, and export your resume library</p>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                        placeholder="Search saved resumes..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                </div>
                <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Filter
                </Button>
            </div>

            {filteredResumes.length === 0 ? (
                <Card className="p-12 text-center">
                    <div className="space-y-4">
                        <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                            <FileText className="h-8 w-8 text-gray-400" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">No resumes generated yet</h3>
                            <p className="text-gray-600">Head to 'Resume Generation' to create your first one!</p>
                        </div>
                    </div>
                </Card>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredResumes.map((resume) => (
                        <Card key={resume.id} className="hover:shadow-md transition-shadow">
                            <CardHeader className="pb-3">
                                <div className="flex items-start justify-between">
                                    <div className="space-y-1 flex-1">
                                        <h3 className="font-semibold text-lg leading-tight">{resume.name}</h3>
                                        <p className="text-sm text-blue-600 hover:underline cursor-pointer">For: {resume.associatedJob}</p>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8"
                                            onClick={() => handleToggleFavorite(resume.id)}
                                        >
                                            <Star
                                                className={`h-4 w-4 ${resume.isFavorite ? "text-yellow-500 fill-current" : "text-gray-400"}`}
                                            />
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Calendar className="h-4 w-4" />
                                    <span>Generated: {resume.dateGenerated}</span>
                                </div>

                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <span>Modified: {resume.lastModified}</span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Badge variant="outline">Versions: {resume.versions}</Badge>
                                        <Badge className={getStatusColor(resume.status)}>
                                            {resume.status.charAt(0).toUpperCase() + resume.status.slice(1)}
                                        </Badge>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-2 pt-2">
                                    <Button variant="outline" size="sm" className="gap-1">
                                        <Eye className="h-3 w-3" />
                                        View
                                    </Button>
                                    <Button variant="outline" size="sm" className="gap-1">
                                        <Edit className="h-3 w-3" />
                                        Edit
                                    </Button>
                                    <Button variant="outline" size="sm" className="gap-1">
                                        <Download className="h-3 w-3" />
                                        PDF
                                    </Button>
                                    <Button variant="outline" size="sm" className="gap-1">
                                        <Copy className="h-3 w-3" />
                                        Duplicate
                                    </Button>
                                </div>

                                <div className="flex justify-between items-center pt-2 border-t">
                                    <Button variant="ghost" size="sm" className="text-xs">
                                        View Versions
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleDelete(resume.id)}
                                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                    >
                                        <Trash2 className="h-3 w-3" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}
