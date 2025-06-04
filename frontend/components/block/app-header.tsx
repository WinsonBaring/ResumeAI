import {
    ClerkProvider,
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
} from '@clerk/nextjs';
import { ModeToggle } from '@/components/block/theme-toggle';
import {
    SidebarInset,
    SidebarProvider,
    SidebarRail,
    SidebarTrigger,
} from '@/components/ui/sidebar';
import { Separator } from '@radix-ui/react-separator';
import { NavigationMenuDemo } from '@/components/block/navigation-menu';
import SignInPage from '@/components/parts/sign-in-button';
import { Button } from '@/components/ui/button';
import { Rocket, Menu } from 'lucide-react';
import Link from 'next/link';

export default function AppHeader() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center space-x-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                        <Rocket className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <span className="text-xl font-bold">ProjectHub</span>
                </div>

                <nav className="hidden md:flex items-center space-x-6">
                    <NavigationMenuDemo />
                </nav>

                <div className="flex items-center space-x-4">
                    <SignedOut>
                        <SignInButton mode="modal">
                            <Button variant="ghost" size="sm" className="hidden md:inline-flex">
                                Sign In
                            </Button>
                        </SignInButton>
                        <SignUpButton mode="modal">
                            <Button size="sm">Get Started</Button>
                        </SignUpButton>
                    </SignedOut>
                    <SignedIn>
                        <UserButton
                            appearance={{
                                elements: {
                                    avatarBox: 'ring-2 ring-blue-500',
                                },
                            }}
                        />
                    </SignedIn>
                    <ModeToggle />
                    <Button variant="ghost" size="sm" className="md:hidden">
                        <Menu className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </header>
    );
}