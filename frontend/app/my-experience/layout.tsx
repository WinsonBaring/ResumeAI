import { AppSidebar } from "@/components/block/app-sidebar";
import HomeHeader from "@/components/block/home-header";
import { SidebarProvider } from "@/components/ui/sidebar"

export default function WorkExperienceLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="w-full flex flex-col  ">
                <HomeHeader />

                <div
                    className='p-4'
                >
                    {children}
                </div>
            </main>
        </SidebarProvider>
    )
}