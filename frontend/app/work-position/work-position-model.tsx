"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"



interface JobDescriptionModalProps {
    isOpen: boolean
    onClose: () => void
    onSave: (job: any) => void
    jobDescription: any
    isLoading?: boolean
    resumeId?: number
}

export function WorkPositionModal({ isOpen, onClose, onSave, jobDescription, isLoading = false, resumeId }: JobDescriptionModalProps) {
    const [formData, setFormData] = useState({
        title: "",
        company: "",
        description: "",
    })

    useEffect(() => {
        if (jobDescription) {
            setFormData({
                title: jobDescription.title,
                company: jobDescription.company,
                description: jobDescription.description,
            })
        } else {
            setFormData({
                title: "",
                company: "",
                description: "",
            })
        }
    }, [jobDescription, isOpen])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const jobData: any = {
            job_id: jobDescription?.job_id || "",
            title: formData.title,
            company: formData.company,
            description: formData.description,
            resume_id: resumeId || jobDescription?.resume_id || 1,
            dateAdded: jobDescription?.dateAdded || new Date().toISOString().split("T")[0],
            lastUsed: new Date().toISOString().split("T")[0],
            isActive: jobDescription?.isActive || false,
        }

        onSave(jobData)
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{jobDescription ? "Edit Job Description" : "Add New Job Description"}</DialogTitle>
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
                                placeholder="e.g., Google"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Job Description *</Label>
                        <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                            placeholder="Paste the full job description here..."
                            rows={12}
                            required
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? "Saving..." : (jobDescription ? "Update Job Description" : "Save Job Description")}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
