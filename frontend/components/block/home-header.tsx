
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
import { Rocket, Link, Menu } from 'lucide-react';
import { Button } from '../ui/button';

export default function HomeHeader () {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="flex mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <SidebarTrigger/>
                        {/* <Separator/> */}
                        {/* <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                            <Rocket className="h-4 w-4 text-primary-foreground" />
                        </div> */}
                       
                    </div>

                   

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
};