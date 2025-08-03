'use client'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Sidebar, User } from "lucide-react";
import { AppSidebar } from "@/components/block/app-sidebar"
import { NavigationMenuDemo } from "@/components/block/navigation-menu";
import { ModeToggle } from "@/components/block/theme-toggle";
import HomeHeader from "@/components/block/home-header";
// import FileManager from "@/components/block/file-manager";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ResumeGenerationPanel } from "@/app/resume-generation/resume-generation-panel";
import { waitFor } from "@/utils/waitFor";
import Memo from "./memo";
import MemoChild from "./memochild";


export default function MemoPage() {
    const result = () => {
        return (
            <Memo > 
                <MemoChild />
            </Memo >
        )
    }
    console.log('result', result())
    return (
        <Memo >
            <MemoChild />
        </Memo >
    );
}
