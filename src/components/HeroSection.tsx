import { Button } from "@/components/ui/button";
import { Flame, Calendar } from "lucide-react";

export const HeroSection = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center bg-game-dog-black">
      {/* Gritty texture overlay */}
      <div className="absolute inset-0 bg-grit opacity-30"></div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto pt-16">
        <h1 className="text-athletic-hero text-6xl md:text-8xl lg:text-9xl text-white mb-6">
          Train Hard. <br />
          <span className="text-game-dog-red">Play Harder.</span> <br />
          Become a <span className="text-game-dog-red">Game Dog</span>.
        </h1>
        
        <p className="text-xl md:text-2xl text-game-dog-gray-light mb-12 max-w-4xl mx-auto font-body">
          Elite athletic training that turns potential into performance. 
          Transform your game with proven methods that build champions.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button 
            onClick={() => scrollToSection('contact')}
            className="btn-game-dog text-lg px-10 py-6 flex items-center gap-3"
          >
            <Flame className="w-5 h-5" />
            Book Training
          </Button>
          <Button 
            onClick={() => scrollToSection('programs')}
            className="btn-game-dog-outline text-lg px-10 py-6 flex items-center gap-3"
          >
            <Calendar className="w-5 h-5" />
            View Programs
          </Button>
        </div>
      </div>

    </section>
  );
};