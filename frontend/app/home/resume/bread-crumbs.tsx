// components/ui/breadcrumbs.tsx
'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import React from 'react'; // Import React for React.Fragment

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

// Define the type directly in this file
export type BreadcrumbItemType = {
    href: string;
    label: string;
    isCurrent?: boolean; // To indicate the current page
};

// Utility function to generate breadcrumbs
const SITE_HOME_LABEL = 'Home';
const SITE_HOME_PATH = '/home'; // Define your actual home path

function generateBreadcrumbs(pathname: string): BreadcrumbItemType[] {
    const breadcrumbs: BreadcrumbItemType[] = [];

    // --- Special handling for the actual home page ---
    if (pathname === SITE_HOME_PATH || pathname === '/') { // Consider '/' also as home for robustness if it redirects to /home
        breadcrumbs.push({
            href: SITE_HOME_PATH,
            label: SITE_HOME_LABEL,
            isCurrent: true, // It is the current page
        });
        return breadcrumbs;
    }

    // --- For all other paths, start with Home ---
    breadcrumbs.push({
        href: SITE_HOME_PATH,
        label: SITE_HOME_LABEL,
        isCurrent: false, // Home is not current if we're elsewhere
    });

    // Remove leading/trailing slashes and split
    // Filter out the "home" segment if it's explicitly part of the path,
    // as it's already handled by the initial "Home" breadcrumb.
    let pathSegments = pathname.split('/').filter(segment => segment !== '');

    // If the path starts with 'home' (e.g., /home/products), remove 'home' from segments
    if (pathSegments[0] === 'home') {
        pathSegments = pathSegments.slice(1);
    }

    let currentPath = SITE_HOME_PATH; // Start building paths from /home

    pathSegments.forEach((segment, index) => {
        currentPath += `/${segment}`;
        const isLastSegment = index === pathSegments.length - 1;

        // A simple way to capitalize and replace hyphens for labels
        const label = segment
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

        breadcrumbs.push({
            href: currentPath,
            label: label,
            isCurrent: isLastSegment,
        });
    });

    return breadcrumbs;
}

export function AppBreadcrumbs() {
    const pathname = usePathname();
    const breadcrumbItems = generateBreadcrumbs(pathname);

    // Don't render if there's only 'Home' and we are on the home path
    if (breadcrumbItems.length === 1 && breadcrumbItems[0].isCurrent) {
        return null;
    }

    return (
        <Breadcrumb className="py-4">
            <BreadcrumbList>
                {breadcrumbItems.map((item, index) => (
                    <React.Fragment key={item.href}>
                        <BreadcrumbItem>
                            {item.isCurrent ? (
                                <span className="font-medium text-foreground">{item.label}</span>
                            ) : (
                                <BreadcrumbLink asChild>
                                    <Link href={item.href}>{item.label}</Link>
                                </BreadcrumbLink>
                            )}
                        </BreadcrumbItem>
                        {index < breadcrumbItems.length - 1 && (
                            <BreadcrumbSeparator />
                        )}
                    </React.Fragment>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
}