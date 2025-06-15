import { AppSidebar } from "@/components/block/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar"

export default function JobDescriptionLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return(
        <SidebarProvider>
            <AppSidebar/>
            {children}
        </SidebarProvider>
    )
}