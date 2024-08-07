import { HeaderSection, BannerSection } from '@/pages/home/components';

export function HomePage() {
    return (
        <main
            className="container mx-auto flex flex-1 flex-row items-center justify-between gap-4 text-text-950
            tablet-lg:flex-col-reverse tablet-lg:justify-around tablet-lg:gap-0
            tablet-sm:mt-20 tablet-sm:justify-end tablet-sm:gap-10"
        >
            <HeaderSection />
            <BannerSection />
        </main>
    );
}
