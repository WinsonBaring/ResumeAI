import { AppSidebar } from "@/app/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar"

export default function HomeLayout({
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