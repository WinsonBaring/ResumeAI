import { Calendar, Home, FileUser, Inbox, Search, Settings } from 'lucide-react';

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

// Menu items.
const items = [
    {
        title: 'Home',
        url: 'home',
        icon: Home,
    },
    {
        title: 'Career',
        url: 'career',
        icon: FileUser,
    },
    // {
    //     title: 'Inbox',
    //     url: 'Inbox',
    //     icon: Inbox,
    // },
    // {
    //     title: 'Calendar',
    //     url: 'Calendar',
    //     icon: Calendar,
    // },
    // {
    //     title: 'Search',
    //     url: 'Search',
    //     icon: Search,
    // },
    // {
    //     title: 'Settings',
    //     url: 'Settings',
    //     icon: Settings,
    // },
];

export function AppSidebar() {
    return (
        <Sidebar variant="floating" collapsible="icon">
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Resume AI</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
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
