import { Calendar, Home, AlignJustify, Briefcase, Play, ListCheck, FileUser, Inbox, Search, Settings } from 'lucide-react';

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { SideBarOption } from '@/app/side-bar-option';

// Menu items.
const items = [
    {
        title: 'Generate Resume',
        url: 'generate-resume',
        icon: Play,
        important: true
    },
    {
        title: 'My Experience',
        url: 'my-experience', // Changed for consistency
        description: "Manage Work History",
        icon: ListCheck,
    },
    {
        title: 'Work Position',
        url: 'work-position',
        description: "Job you are Applying",
        icon: Briefcase,
    },
    // Uncomment and adjust URLs as needed for consistency
    // {
    //     title: 'Home',
    //     url: 'home',
    //     icon: Home,
    // },
    // {
    //     title: 'Career',
    //     url: 'career',
    //     icon: FileUser,
    // },
    // {
    //     title: 'Inbox',
    //     url: 'inbox', // Changed for consistency
    //     icon: Inbox,
    // },
    // {
    //     title: 'Calendar',
    //     url: 'calendar', // Changed for consistency
    //     icon: Calendar,
    // },
    // {
    //     title: 'Search',
    //     url: 'search', // Changed for consistency
    //     icon: Search,
    // },
    // {
    //     title: 'Settings',
    //     url: 'settings', // Changed for consistency
    //     icon: Settings,
    // },
];

export function AppSidebar() {
    return (
        <Sidebar

        // collapsible="icon"
        >
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Resume AI</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                // Simplified rendering: no unnecessary conditional or div wrapper
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild
                                        className='space-y-3'
                                    >
                                        {item.important ? (
                                            <Button
                                                className='mb-6'
                                            >
                                                <Link href={item.url}
                                                    className='flex flex-row justify-center items-center gap-3'
                                                >
                                                    <div
                                                        className='flex justify-center items-center'
                                                    >
                                                        <item.icon />
                                                    </div>
                                                    <span>{item.title}</span>
                                                </Link>
                                            </Button>

                                        ) : (
                                            <SideBarOption
                                                description={item.description!}
                                                icon={item.icon}
                                                title={item.title}
                                                url={item.url}
                                            />

                                        )}
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}