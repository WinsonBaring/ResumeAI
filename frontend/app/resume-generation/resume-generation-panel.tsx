"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Zap, FileText, Download, Share, RefreshCw, Undo, Sparkles, Save } from "lucide-react"
import { PDFGenerator, ResumeData } from "@/utils/pdf-generator"
import { StorageService } from "@/utils/supabase/storage"
import { createClerkSupabaseClient } from "@/utils/supabase/client"
import { useUser } from "@clerk/nextjs"
import { toast } from "sonner"

type GenerationState = "setup" | "generating" | "complete"

const mockExperiences = [
    {
        id: "1",
        title: "Senior Software Engineer - Acme Corp",
        preview: "Led a team of 5 engineers to develop microservices...",
        isSelected: true,
    },
    {
        id: "2",
        title: "Software Engineer - Tech Startup",
        preview: "Developed full-stack web applications using React...",
        isSelected: true,
    },
]

export function ResumeGenerationPanel() {
    const { user } = useUser()
    const [generationState, setGenerationState] = useState<GenerationState>("setup")
    const [selectedExperiences, setSelectedExperiences] = useState(mockExperiences)
    const [progress, setProgress] = useState(0)
    const [resumeName, setResumeName] = useState("Senior SE - Google - V1")
    const [settings, setSettings] = useState({
        tone: "Professional",
        length: "1-page",
        keywordEmphasis: 7,
        creativity: 5,
    })
    const [isSaving, setIsSaving] = useState(false)
    const resumePreviewRef = useRef<HTMLDivElement>(null)

    const activeJob = {
        title: "Senior Software Engineer",
        company: "Google",
    }

    const generateResumeData = (): ResumeData => {
        return {
            name: "John Doe",
            email: "john.doe@email.com",
            phone: "(555) 123-4567",
            summary: "Experienced Senior Software Engineer with 5+ years developing scalable web applications and leading cross-functional teams. Proven track record of improving system performance and mentoring junior developers.",
            experience: [
                {
                    title: "Senior Software Engineer",
                    company: "Acme Corp",
                    period: "2022 - Present",
                    achievements: [
                        "Led team of 5 engineers developing microservices architecture",
                        "Improved system performance by 40% through optimization",
                        "Implemented CI/CD pipelines reducing deployment time by 60%"
                    ]
                }
            ],
            skills: ["JavaScript", "React", "Node.js", "Python", "AWS", "Docker", "Kubernetes"],
            education: [
                {
                    degree: "Bachelor of Science in Computer Science",
                    school: "University of Technology",
                    year: "2018"
                }
            ]
        }
    }

    const handleGenerate = async () => {
        setGenerationState("generating")
        setProgress(0)

        // Simulate generation progress
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval)
                    setGenerationState("complete")
                    return 100
                }
                return prev + 10
            })
        }, 500)
    }

    const handleSaveToSupabase = async () => {
        if (!user) {
            toast.error("Please sign in to save your resume")
            return
        }

        setIsSaving(true)
        try {
            // Generate PDF from the preview
            if (!resumePreviewRef.current) {
                throw new Error("Resume preview not found")
            }

            const pdfBlob = await PDFGenerator.generatePDFFromHTML(
                resumePreviewRef.current,
                `${resumeName}.pdf`
            )

            // Create a resume record first
            const supabase = createClerkSupabaseClient()
            const { data: resumeData, error: resumeError } = await supabase
                .from('Resume')
                .insert({
                    title: resumeName,
                    description: "AI-generated resume",
                    user_id: user.id
                })
                .select()
                .single()

            if (resumeError) {
                throw new Error(`Failed to create resume: ${resumeError.message}`)
            }

            // Upload PDF to storage
            const filename = `${resumeName.replace(/[^a-zA-Z0-9]/g, '_')}_v1.pdf`
            const { url: pdfUrl } = await StorageService.uploadPDF(
                pdfBlob,
                filename,
                user.id,
                resumeData.id,
                1
            )

            // Save resume version (we'll create a simple version without the complex table for now)
            const { error: versionError } = await supabase
                .from('Resume Content')
                .insert({
                    resume_id: resumeData.id,
                    resume_content: JSON.stringify(generateResumeData()),
                    user_id: user.id
                })

            if (versionError) {
                throw new Error(`Failed to save resume version: ${versionError.message}`)
            }

            toast.success("Resume saved successfully!")
            
        } catch (error) {
            console.error('Save error:', error)
            toast.error(error instanceof Error ? error.message : "Failed to save resume")
        } finally {
            setIsSaving(false)
        }
    }

    const handleDownloadPDF = async () => {
        if (!resumePreviewRef.current) {
            toast.error("Resume preview not found")
            return
        }

        try {
            const pdfBlob = await PDFGenerator.generatePDFFromHTML(
                resumePreviewRef.current,
                `${resumeName}.pdf`
            )
            PDFGenerator.downloadPDF(pdfBlob, `${resumeName}.pdf`)
            toast.success("PDF downloaded successfully!")
        } catch (error) {
            console.error('Download error:', error)
            toast.error("Failed to download PDF")
        }
    }

    const handleExperienceToggle = (id: string) => {
        setSelectedExperiences((prev) => prev.map((exp) => (exp.id === id ? { ...exp, isSelected: !exp.isSelected } : exp)))
    }

    if (generationState === "generating") {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Card className="w-full max-w-md p-8 text-center">
                    <div className="space-y-6">
                        <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                            <Sparkles className="h-8 w-8 text-blue-600 animate-pulse" />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-2">Generating Your Resume</h3>
                            <p className="text-gray-600 mb-4">AI is crafting your perfect resume...</p>
                            <Progress value={progress} className="w-full" />
                        </div>
                        <div className="text-sm text-gray-500">
                            {progress < 30 && "Analyzing skills from your experience..."}
                            {progress >= 30 && progress < 60 && "Tailoring achievements to the job description..."}
                            {progress >= 60 && progress < 90 && "Crafting impactful bullet points..."}
                            {progress >= 90 && "Finalizing format..."}
                        </div>
                    </div>
                </Card>
            </div>
        )
    }

    if (generationState === "complete") {
        return (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
                {/* Resume Preview */}
                <div className="lg:col-span-2">
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle>Resume Preview</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div 
                                ref={resumePreviewRef}
                                className="bg-white border rounded-lg p-8 min-h-[600px] shadow-sm"
                            >
                                <div className="space-y-6">
                                    <div className="text-center border-b pb-4">
                                        <h1 className="text-2xl font-bold">John Doe</h1>
                                        <p className="text-gray-600">john.doe@email.com | (555) 123-4567</p>
                                    </div>

                                    <div>
                                        <h2 className="text-lg font-semibold mb-3">Professional Summary</h2>
                                        <p className="text-sm text-gray-700">
                                            Experienced Senior Software Engineer with 5+ years developing scalable web applications and
                                            leading cross-functional teams. Proven track record of improving system performance and mentoring
                                            junior developers.
                                        </p>
                                    </div>

                                    <div>
                                        <h2 className="text-lg font-semibold mb-3">Experience</h2>
                                        <div className="space-y-4">
                                            <div>
                                                <div className="flex justify-between items-start mb-2">
                                                    <div>
                                                        <h3 className="font-medium">Senior Software Engineer</h3>
                                                        <p className="text-sm text-gray-600">Acme Corp</p>
                                                    </div>
                                                    <span className="text-sm text-gray-500">2022 - Present</span>
                                                </div>
                                                <ul className="text-sm text-gray-700 space-y-1 ml-4">
                                                    <li>• Led team of 5 engineers developing microservices architecture</li>
                                                    <li>• Improved system performance by 40% through optimization</li>
                                                    <li>• Implemented CI/CD pipelines reducing deployment time by 60%</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h2 className="text-lg font-semibold mb-3">Skills</h2>
                                        <p className="text-sm text-gray-700">
                                            JavaScript, React, Node.js, Python, AWS, Docker, Kubernetes
                                        </p>
                                    </div>

                                    <div>
                                        <h2 className="text-lg font-semibold mb-3">Education</h2>
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-medium">Bachelor of Science in Computer Science</h3>
                                                <p className="text-sm text-gray-600">University of Technology</p>
                                            </div>
                                            <span className="text-sm text-gray-500">2018</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Controls */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Resume Settings</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="resumeName">Resume Name</Label>
                                <Input id="resumeName" value={resumeName} onChange={(e) => setResumeName(e.target.value)} />
                            </div>

                            <div>
                                <Label>Tone: {settings.tone}</Label>
                                <div className="flex gap-2 mt-2">
                                    {["Professional", "Creative", "Technical"].map((tone) => (
                                        <Button
                                            key={tone}
                                            variant={settings.tone === tone ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => setSettings((prev) => ({ ...prev, tone }))}
                                        >
                                            {tone}
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <Label>Keyword Emphasis: {settings.keywordEmphasis}</Label>
                                <Slider
                                    value={[settings.keywordEmphasis]}
                                    onValueChange={([value]) => setSettings((prev) => ({ ...prev, keywordEmphasis: value }))}
                                    max={10}
                                    min={1}
                                    step={1}
                                    className="mt-2"
                                />
                            </div>

                            <div className="flex gap-2">
                                <Button className="flex-1 gap-2">
                                    <RefreshCw className="h-4 w-4" />
                                    Regenerate
                                </Button>
                                <Button variant="outline" size="icon">
                                    <Undo className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <Button 
                                className="w-full gap-2" 
                                onClick={handleDownloadPDF}
                            >
                                <Download className="h-4 w-4" />
                                Download PDF
                            </Button>
                            <Button 
                                variant="outline" 
                                className="w-full gap-2"
                                onClick={handleSaveToSupabase}
                                disabled={isSaving}
                            >
                                <Save className="h-4 w-4" />
                                {isSaving ? "Saving..." : "Save to Cloud"}
                            </Button>
                            <Button variant="outline" className="w-full gap-2">
                                <Download className="h-4 w-4" />
                                Download DOCX
                            </Button>
                            <Button variant="outline" className="w-full gap-2">
                                <Share className="h-4 w-4" />
                                Share Link
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Resume Generation</h1>
                <p className="text-gray-600 mt-1">Create AI-powered resumes tailored to your target job</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Active Job Description
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-semibold">{activeJob.title}</h3>
                            <p className="text-sm text-gray-600">{activeJob.company}</p>
                        </div>
                        <Button variant="outline" size="sm">
                            Change JD
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Select Experience Snippets</CardTitle>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                            Select All
                        </Button>
                        <Button variant="outline" size="sm">
                            Deselect All
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {selectedExperiences.map((experience) => (
                            <div key={experience.id} className="flex items-start gap-3 p-3 border rounded-lg">
                                <Checkbox
                                    checked={experience.isSelected}
                                    onCheckedChange={() => handleExperienceToggle(experience.id)}
                                />
                                <div className="flex-1">
                                    <h4 className="font-medium text-sm">{experience.title}</h4>
                                    <p className="text-xs text-gray-600 mt-1">{experience.preview}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-center">
                <Button size="lg" className="gap-2 px-8" onClick={handleGenerate}>
                    <Zap className="h-5 w-5" />
                    Generate Resume
                </Button>
            </div>
        </div>
    )
}
