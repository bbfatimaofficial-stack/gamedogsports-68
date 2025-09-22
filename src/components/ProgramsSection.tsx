import { Button } from "@/components/ui/button";
import { Target, Zap, Dumbbell, Brain, Flame, GraduationCap, Sun } from "lucide-react";

export const ProgramsSection = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };
  const programs = [
    {
      icon: Target,
      title: "BASEBALL & SOFTBALL EXCELLENCE",
      description: "Master hitting mechanics, fielding techniques, and game strategy. From Little League to college prep, we develop complete players.",
      features: ["Batting Mechanics", "Fielding Fundamentals", "Pitching Development", "Game Situations"]
    },
    {
      icon: Zap,
      title: "Speed & Agility",
      description: "Explosive speed training that makes you untouchable. Develop lightning-fast reflexes and game-changing acceleration.",
      features: ["Sprint Mechanics", "Acceleration Training", "Direction Changes", "Reaction Time"]
    },
    {
      icon: Dumbbell,
      title: "Strength & Power",
      description: "Build functional strength that translates directly to athletic performance. Get stronger, more explosive, and injury-resistant.",
      features: ["Power Development", "Functional Training", "Injury Prevention", "Sport-Specific Strength"]
    },
    {
      icon: Brain,
      title: "Mental Performance",
      description: "Champions are made in the mind first. Develop unshakeable confidence, laser focus, and clutch performance under pressure.",
      features: ["Confidence Building", "Focus Training", "Pressure Performance", "Goal Achievement"]
    },
    {
      icon: GraduationCap,
      title: "After School Program",
      description: "\"Classroom First\" / \"Mind Over Diamonds\" - Start off the school year great with homework support, tutoring, and baseball training.",
      features: ["Homework & Tutoring", "Baseball Coaching", "Mentorship", "Character Building"],
      schedule: "Aug-Dec | Tue & Thu 4-6pm",
      age: "6th to 8th Grade"
    },
    {
      icon: Sun,
      title: "Summer Camp",
      description: "Comprehensive summer program emphasizing education, life skills, and athletic development with special guest speakers and career guidance.",
      features: ["Mentorship & Mindset", "Educational Information", "Life Skills", "Athletic Training"],
      schedule: "June-Aug | 8am-12pm",
      age: "6th to 12th Grade"
    }
  ];

  return (
    <section id="programs" className="py-20 px-6 bg-game-dog-black bg-grit">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-athletic-hero text-6xl md:text-7xl text-white mb-6">
            Elite <span className="text-game-dog-red">Programs</span>
          </h2>
          <p className="text-xl text-game-dog-gray-light max-w-3xl mx-auto font-body">
            Choose your path to greatness. Each program is designed to push your limits and unlock your true athletic potential.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {programs.map((program, index) => {
            const IconComponent = program.icon;
            return (
              <div key={index} className="card-program group">
                <div className="mb-6 group-hover:scale-110 transition-transform flex justify-center">
                  <IconComponent className="w-16 h-16 text-game-dog-red group-hover:text-white transition-colors" />
                </div>
                
                <h3 className="text-athletic-heading text-2xl mb-4 group-hover:text-white transition-colors">
                  {program.title}
                </h3>
                
                <p className="text-game-dog-gray-light mb-6 font-body leading-relaxed group-hover:text-white transition-colors">
                  {program.description}
                </p>

                {(program as any).schedule && (
                  <div className="mb-4">
                    <p className="text-sm text-game-dog-red font-semibold">{(program as any).schedule}</p>
                    <p className="text-sm text-game-dog-gray-medium">{(program as any).age}</p>
                  </div>
                )}

                <ul className="space-y-2 mb-8">
                  {program.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="text-sm text-game-dog-gray-medium group-hover:text-game-dog-gray-light transition-colors flex items-center">
                      <span className="w-2 h-2 bg-game-dog-red rounded-full mr-3 group-hover:bg-white transition-colors flex-shrink-0"></span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button 
                  onClick={() => scrollToSection('contact')}
                  className="w-full btn-game-dog text-sm py-3 flex items-center justify-center gap-2"
                >
                  <Flame className="w-4 h-4" />
                  Sign Up Today
                </Button>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <p className="text-game-dog-gray-light mb-8 text-lg font-body">
            Ready to join the elite? Choose your program and start your transformation today.
          </p>
          <Button 
            onClick={() => scrollToSection('contact')}
            className="btn-game-dog text-xl px-12 py-6 flex items-center gap-3 mx-auto"
          >
            <Target className="w-6 h-6" />
            Join the Pack
          </Button>
        </div>
      </div>
    </section>
  );
};