import { HeroSection } from "./HeroSection/HeroSection";
import { MainSection } from "./MainSection/MainSection";

export function HomePage() {
  return (
    <div>
      <div className="h-full w-full relative">
        <HeroSection></HeroSection>
        <MainSection></MainSection>
      </div>
    </div>
  );
}
