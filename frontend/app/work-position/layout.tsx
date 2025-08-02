import { AppSidebar } from "@/components/block/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar"
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function JobDescriptionLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { userId } = await auth()
    
    if (!userId) {
        redirect('/sign-in')
    }   

    return(

        <SidebarProvider>
            <AppSidebar/>
            {children}
        </SidebarProvider>
    )
}