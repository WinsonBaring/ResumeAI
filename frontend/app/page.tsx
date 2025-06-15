'use client'
// app/page.tsx (or wherever your Home component is)
import AppHeader from '@/components/block/app-header';
import { Button } from '@/components/ui/button';
import HomePage from '@/app/home/page';
import LandingPage from '@/components/block/landing-page';

export default function Home() {

    return (
        <div>
            <LandingPage />
        </div>
    );
};

// export default Home;
