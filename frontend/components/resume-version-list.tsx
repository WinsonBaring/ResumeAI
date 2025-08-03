// "use client"

// import { useState, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Download, Calendar, FileText, Trash2 } from "lucide-react"
// import { createClerkSupabaseClient } from "@/utils/supabase/client"
// import { useUser } from "@clerk/nextjs"
// import { toast } from "sonner"
// import { format } from "date-fns"

// interface ResumeVersion {
//   id: number
//   resume_id: number
//   version_number: number
//   title: string
//   created_at: string
//   pdf_url?: string
//   pdf_filename?: string
// }

// export function ResumeVersionList({ resumeId }: { resumeId: number }) {
//   const { user } = useUser()
//   const [versions, setVersions] = useState<ResumeVersion[]>([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     if (user && resumeId) {
//       loadVersions()
//     }
//   }, [user, resumeId])

//   const loadVersions = async () => {
//     try {
//       const supabase = createClerkSupabaseClient()
//       const { data, error } = await supabase
//         .from('Resume Content')
//         .select('*')
//         .eq('resume_id', resumeId)
//         .eq('user_id', user?.id!)
//         .order('created_at', { ascending: false })

//       if (error) {
//         throw error
//       }

//       // Transform data to match our interface
//       const transformedVersions: ResumeVersion[] = data.map((item, index) => ({
//         id: item.id,
//         resume_id: item.resume_id,
//         version_number: data.length - index, // Reverse order for version numbers
//         title: `Version ${data.length - index}`,
//         created_at: item.created_at,
//         pdf_url: undefined, // We'll need to implement this when we have the Resume Versions table
//         pdf_filename: undefined
//       }))

//       setVersions(transformedVersions)
//     } catch (error) {
//       console.error('Error loading versions:', error)
//       toast.error('Failed to load resume versions')
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleDownload = async (version: ResumeVersion) => {
//     try {
//       if (!version.pdf_url) {
//         toast.error('PDF not available for this version')
//         return
//       }

//       const response = await fetch(version.pdf_url)
//       if (!response.ok) {
//         throw new Error('Failed to download PDF')
//       }

//       const blob = await response.blob()
//       const url = URL.createObjectURL(blob)
//       const link = document.createElement('a')
//       link.href = url
//       link.download = version.pdf_filename || `${version.title}.pdf`
//       document.body.appendChild(link)
//       link.click()
//       document.body.removeChild(link)
//       URL.revokeObjectURL(url)

//       toast.success('PDF downloaded successfully!')
//     } catch (error) {
//       console.error('Download error:', error)
//       toast.error('Failed to download PDF')
//     }
//   }

//   const handleDelete = async (versionId: number) => {
//     if (!confirm('Are you sure you want to delete this version?')) {
//       return
//     }

//     try {
//       const supabase = createClerkSupabaseClient()
//       const { error } = await supabase
//         .from('Resume Content')
//         .delete()
//         .eq('id', versionId)
//         .eq('user_id', user?.id!)

//       if (error) {
//         throw error
//       }

//       toast.success('Version deleted successfully!')
//       loadVersions() // Reload the list
//     } catch (error) {
//       console.error('Delete error:', error)
//       toast.error('Failed to delete version')
//     }
//   }

//   if (loading) {
//     return (
//       <Card>
//         <CardHeader>
//           <CardTitle>Resume Versions</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="text-center py-8">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
//             <p className="mt-2 text-gray-600">Loading versions...</p>
//           </div>
//         </CardContent>
//       </Card>
//     )
//   }

//   if (versions.length === 0) {
//     return (
//       <Card>
//         <CardHeader>
//           <CardTitle>Resume Versions</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="text-center py-8">
//             <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//             <p className="text-gray-600">No versions found</p>
//             <p className="text-sm text-gray-500 mt-1">Generate and save your first resume to see versions here</p>
//           </div>
//         </CardContent>
//       </Card>
//     )
//   }

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Resume Versions</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <div className="space-y-3">
//           {versions.map((version) => (
//             <div
//               key={version.id}
//               className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
//             >
//               <div className="flex items-center gap-3">
//                 <div className="flex items-center gap-2">
//                   <FileText className="h-5 w-5 text-gray-600" />
//                   <div>
//                     <h4 className="font-medium">{version.title}</h4>
//                     <div className="flex items-center gap-2 text-sm text-gray-500">
//                       <Calendar className="h-4 w-4" />
//                       <span>{format(new Date(version.created_at), 'MMM dd, yyyy')}</span>
//                     </div>
//                   </div>
//                 </div>
//                 <Badge variant="secondary">v{version.version_number}</Badge>
//               </div>
              
//               <div className="flex items-center gap-2">
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={() => handleDownload(version)}
//                   disabled={!version.pdf_url}
//                 >
//                   <Download className="h-4 w-4" />
//                   Download
//                 </Button>
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={() => handleDelete(version.id)}
//                 >
//                   <Trash2 className="h-4 w-4" />
//                 </Button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </CardContent>
//     </Card>
//   )
// } 
import React from 'react'

const ResumeVersionList = () => {
  return (
    <div>ResumeVersionList</div>
  )
}

export default ResumeVersionList