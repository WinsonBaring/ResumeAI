// app/page.tsx (or wherever your Home component is)
'use client'
import AppHeader from '@/components/block/app-header';
import { Button } from '@/components/ui/button';
import HomePage from '@/app/home/page';
import LandingPage from '@/components/block/landing-page';
const Home = () => {
    // Sidebar open state
    return (
        <LandingPage/>
    );
};

export default Home;
