import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import gameDogLogo from "@/assets/game-dog-logo.png";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-game-dog-black border-b border-game-dog-gray-dark">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center space-x-3">
            <img 
              src={gameDogLogo} 
              alt="Game Dogs Sports Logo" 
              className="h-8 w-8 object-contain"
            />
            <h1 className="text-athletic-heading text-xl text-white">
              Game Dogs <span className="text-game-dog-red">Sports</span>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-baseline space-x-8">
              <button
                onClick={() => scrollToSection('hero')}
                className="text-white hover:text-game-dog-red transition-colors duration-300 px-3 py-2 text-sm font-medium"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="text-white hover:text-game-dog-red transition-colors duration-300 px-3 py-2 text-sm font-medium"
              >
                Meet Your Coach
              </button>
              <button
                onClick={() => scrollToSection('programs')}
                className="text-white hover:text-game-dog-red transition-colors duration-300 px-3 py-2 text-sm font-medium"
              >
                Programs
              </button>
              <button
                onClick={() => scrollToSection('testimonials')}
                className="text-white hover:text-game-dog-red transition-colors duration-300 px-3 py-2 text-sm font-medium"
              >
                Testimonials
              </button>
              <Button
                onClick={() => scrollToSection('contact')}
                variant="default"
                className="bg-game-dog-red hover:bg-game-dog-red/90 text-white font-medium"
              >
                Contact Us
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-game-dog-red hover:bg-transparent"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-game-dog-black border-t border-game-dog-gray-dark">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button
              onClick={() => scrollToSection('hero')}
              className="text-white hover:text-game-dog-red block px-3 py-2 text-base font-medium w-full text-left transition-colors duration-300"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-white hover:text-game-dog-red block px-3 py-2 text-base font-medium w-full text-left transition-colors duration-300"
            >
              Meet Your Coach
            </button>
            <button
              onClick={() => scrollToSection('programs')}
              className="text-white hover:text-game-dog-red block px-3 py-2 text-base font-medium w-full text-left transition-colors duration-300"
            >
              Programs
            </button>
            <button
              onClick={() => scrollToSection('testimonials')}
              className="text-white hover:text-game-dog-red block px-3 py-2 text-base font-medium w-full text-left transition-colors duration-300"
            >
              Testimonials
            </button>
            <div className="px-3 py-2">
              <Button
                onClick={() => scrollToSection('contact')}
                variant="default"
                className="bg-game-dog-red hover:bg-game-dog-red/90 text-white font-medium w-full"
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};