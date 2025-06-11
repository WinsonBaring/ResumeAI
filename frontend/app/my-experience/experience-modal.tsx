"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

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

interface ExperienceModalProps {
    isOpen: boolean
    onClose: () => void
    onSave: (experience: Experience) => void
    experience: Experience | null
}

export function ExperienceModal({ isOpen, onClose, onSave, experience }: ExperienceModalProps) {
    const [formData, setFormData] = useState({
        title: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        description: "",
        tags: "",
        isPresent: false,
    })

    useEffect(() => {
        if (experience) {
            setFormData({
                title: experience.title,
                company: experience.company,
                location: experience.location,
                startDate: experience.startDate,
                endDate: experience.endDate === "Present" ? "" : experience.endDate,
                description: experience.description,
                tags: experience.tags.join(", "),
                isPresent: experience.endDate === "Present",
            })
        } else {
            setFormData({
                title: "",
                company: "",
                location: "",
                startDate: "",
                endDate: "",
                description: "",
                tags: "",
                isPresent: false,
            })
        }
    }, [experience, isOpen])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const experienceData: Experience = {
            id: experience?.id || "",
            title: formData.title,
            company: formData.company,
            location: formData.location,
            startDate: formData.startDate,
            endDate: formData.isPresent ? "Present" : formData.endDate,
            description: formData.description,
            tags: formData.tags
                .split(",")
                .map((tag) => tag.trim())
                .filter(Boolean),
            isRecent: true,
            isFrequentlyUsed: experience?.isFrequentlyUsed || false,
        }

        onSave(experienceData)
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{experience ? "Edit Experience" : "Add New Experience"}</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Job Title *</Label>
                            <Input
                                id="title"
                                value={formData.title}
                                onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                                placeholder="e.g., Senior Software Engineer"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="company">Company *</Label>
                            <Input
                                id="company"
                                value={formData.company}
                                onChange={(e) => setFormData((prev) => ({ ...prev, company: e.target.value }))}
                                placeholder="e.g., Acme Corp"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                            id="location"
                            value={formData.location}
                            onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                            placeholder="e.g., San Francisco, CA or Remote"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="startDate">Start Date *</Label>
                            <Input
                                id="startDate"
                                type="month"
                                value={formData.startDate}
                                onChange={(e) => setFormData((prev) => ({ ...prev, startDate: e.target.value }))}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="endDate">End Date</Label>
                            <Input
                                id="endDate"
                                type="month"
                                value={formData.endDate}
                                onChange={(e) => setFormData((prev) => ({ ...prev, endDate: e.target.value }))}
                                disabled={formData.isPresent}
                            />
                            <div className="flex items-center space-x-2 mt-2">
                                <Checkbox
                                    id="present"
                                    checked={formData.isPresent}
                                    onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isPresent: checked as boolean }))}
                                />
                                <Label htmlFor="present" className="text-sm">
                                    I currently work here
                                </Label>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Experience Description *</Label>
                        <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                            placeholder="Describe your role, responsibilities, and key achievements..."
                            rows={6}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="tags">Tags</Label>
                        <Input
                            id="tags"
                            value={formData.tags}
                            onChange={(e) => setFormData((prev) => ({ ...prev, tags: e.target.value }))}
                            placeholder="e.g., Leadership, Backend, React (comma-separated)"
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit">{experience ? "Update Experience" : "Save Experience"}</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
