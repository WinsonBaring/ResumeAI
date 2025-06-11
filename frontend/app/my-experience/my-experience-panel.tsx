"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Filter, Edit, Trash2, Copy, Clock, Star } from "lucide-react"
import { ExperienceModal } from "@/app/my-experience/experience-modal"

interface Experience {
    id: string
    title: string
    company: string
    location: string
    startDate: string
    endDate: string
    description: string
    tags: string[]
    isRecent: boolean
    isFrequentlyUsed: boolean
}

const mockExperiences: Experience[] = [
    {
        id: "1",
        title: "Senior Software Engineer",
        company: "Acme Corp",
        location: "San Francisco, CA",
        startDate: "2022-01",
        endDate: "Present",
        description:
            "Led a team of 5 engineers to develop a new microservices architecture that improved system performance by 40%. Implemented CI/CD pipelines and mentored junior developers.",
        tags: ["Leadership", "Backend", "Microservices"],
        isRecent: true,
        isFrequentlyUsed: true,
    },
    {
        id: "2",
        title: "Software Engineer",
        company: "Tech Startup",
        location: "Remote",
        startDate: "2020-06",
        endDate: "2021-12",
        description:
            "Developed full-stack web applications using React and Node.js. Collaborated with product team to define requirements and deliver features on tight deadlines.",
        tags: ["Frontend", "React", "Node.js"],
        isRecent: false,
        isFrequentlyUsed: false,
    },
]

export function MyExperiencePanel() {
    const [experiences, setExperiences] = useState<Experience[]>(mockExperiences)
    const [searchTerm, setSearchTerm] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingExperience, setEditingExperience] = useState<Experience | null>(null)

    const filteredExperiences = experiences.filter(
        (exp) =>
            exp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            exp.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
            exp.description.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    const handleAddNew = () => {
        setEditingExperience(null)
        setIsModalOpen(true)
    }

    const handleEdit = (experience: Experience) => {
        setEditingExperience(experience)
        setIsModalOpen(true)
    }

    const handleSave = (experience: Experience) => {
        if (editingExperience) {
            setExperiences((prev) => prev.map((exp) => (exp.id === editingExperience.id ? experience : exp)))
        } else {
            setExperiences((prev) => [...prev, { ...experience, id: Date.now().toString() }])
        }
        setIsModalOpen(false)
        setEditingExperience(null)
    }

    const handleDelete = (id: string) => {
        setExperiences((prev) => prev.filter((exp) => exp.id !== id))
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">My Experience</h1>
                    <p className="text-gray-600 mt-1">Manage your work history and achievements</p>
                </div>
                <Button onClick={handleAddNew} className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add New Experience
                </Button>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                        placeholder="Search experiences by keyword, company, or role..."
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

            {filteredExperiences.length === 0 ? (
                <Card className="p-12 text-center">
                    <div className="space-y-4">
                        <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                            <Plus className="h-8 w-8 text-gray-400" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">No experience snippets yet</h3>
                            <p className="text-gray-600">Click "Add New Experience" to get started!</p>
                        </div>
                        <Button onClick={handleAddNew} className="gap-2">
                            <Plus className="h-4 w-4" />
                            Add Your First Experience
                        </Button>
                    </div>
                </Card>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {filteredExperiences.map((experience) => (
                        <Card key={experience.id} className="hover:shadow-md transition-shadow">
                            <CardHeader className="pb-3">
                                <div className="flex items-start justify-between">
                                    <div className="space-y-1">
                                        <h3 className="font-semibold text-lg leading-tight">
                                            {experience.title} - {experience.company}
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            {experience.startDate} - {experience.endDate}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        {experience.isRecent && (
                                            <Badge variant="secondary" className="bg-green-100 text-green-800">
                                                Recent
                                            </Badge>
                                        )}
                                        {experience.isFrequentlyUsed && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-sm text-gray-700 line-clamp-3">{experience.description}</p>

                                <div className="flex flex-wrap gap-2">
                                    {experience.tags.map((tag) => (
                                        <Badge key={tag} variant="outline" className="text-xs">
                                            #{tag}
                                        </Badge>
                                    ))}
                                </div>

                                <div className="flex items-center justify-between pt-2">
                                    <div className="flex items-center gap-2">
                                        <Button variant="ghost" size="sm" onClick={() => handleEdit(experience)} className="gap-1">
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
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleDelete(experience.id)}
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

            <ExperienceModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                experience={editingExperience}
            />
        </div>
    )
}
