// export const experimental_ppr = true

import { AppSidebar } from "@/components/block/app-sidebar";
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