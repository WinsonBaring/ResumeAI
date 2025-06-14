import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Sidebar, User } from "lucide-react";
import { AppSidebar } from "@/app/app-sidebar"
import { NavigationMenuDemo } from "@/components/block/navigation-menu";
import { ModeToggle } from "@/components/block/theme-toggle";
import HomeHeader from "@/components/block/home-header";
// import FileManager from "@/components/block/file-manager";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { GeneratedResumesPanel } from "@/app/generate-resume/generate-resume-panel";
import { waitFor } from "@/utils/waitFor";

export default function ResumePage() {
    return (
        <main className="w-full flex flex-col  ">
            <HomeHeader />
            <div
                className="p-3"
            >
                <GeneratedResumesPanel/>
            </div>
        </main>
    );
}
