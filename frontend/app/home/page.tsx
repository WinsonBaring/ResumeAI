import HomeHeader from "@/components/block/home-header";
// import FileManager from "@/components/block/file-manager";
import HomeHero from "@/app/home/home-hero";

export default function HomePage() {
    return (
        <main className="w-full flex flex-col  ">
            <HomeHeader />
            <div className="mt-[1.5%]">
                <HomeHero/>
            </div>


        </main>
    );
}
