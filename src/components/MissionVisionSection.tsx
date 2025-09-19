import trainingGroup from "@/assets/training-group.jpg";
import { Target, Trophy, Star, Zap, Handshake } from "lucide-react";

export const MissionVisionSection = () => {
  return (
    <section className="py-20 px-6 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={trainingGroup} 
          alt="Athletes training together in intense group session"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-game-dog-gray-light/95 via-game-dog-gray-light/90 to-game-dog-gray-light/95"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-athletic-hero text-6xl md:text-7xl text-game-dog-black mb-6">
            Our <span className="text-game-dog-red">Purpose</span>
          </h2>
          <div className="w-32 h-1 bg-game-dog-red mx-auto"></div>
        </div>

        {/* Mission & Vision Grid */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Mission */}
          <div className="bg-game-dog-black text-white p-10 rounded-lg shadow-2xl transform hover:scale-105 transition-transform">
            <div className="w-16 h-16 bg-game-dog-red rounded-full flex items-center justify-center mb-6">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-athletic-heading text-3xl mb-6 text-game-dog-red">
              Our Mission
            </h3>
            <p className="text-lg font-body leading-relaxed">
              To forge elite athletes by providing world-class training that develops not just physical abilities, but mental toughness, character, and the relentless pursuit of excellence. We transform potential into performance through proven methods, personalized coaching, and an unwavering commitment to each athlete's success.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-white text-game-dog-black p-10 rounded-lg shadow-2xl border-2 border-game-dog-red transform hover:scale-105 transition-transform">
            <div className="w-16 h-16 bg-game-dog-red rounded-full flex items-center justify-center mb-6">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-athletic-heading text-3xl mb-6 text-game-dog-red">
              Our Vision
            </h3>
            <p className="text-lg font-body leading-relaxed">
              To be the premier destination for athletes who refuse to settle for average. We envision a community where champions are made, limits are shattered, and every athlete discovers the Game Dog within themselves. Our goal is to develop not just better players, but better people who carry the lessons of the field into every aspect of their lives.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="mt-16">
          <h3 className="text-athletic-heading text-4xl text-center text-game-dog-black mb-12">
            Built on These <span className="text-game-dog-red">Values</span>
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-game-dog-red rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Star className="w-10 h-10 text-white" />
              </div>
              <h4 className="text-athletic text-xl font-bold text-game-dog-black mb-2">Excellence</h4>
              <p className="text-gray-600 font-body">Settling for "good enough" isn't in our vocabulary. We pursue perfection in every detail.</p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-game-dog-red rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Zap className="w-10 h-10 text-white" />
              </div>
              <h4 className="text-athletic text-xl font-bold text-game-dog-black mb-2">Grit</h4>
              <p className="text-gray-600 font-body">Champions are forged through adversity. We embrace the grind and push through barriers.</p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-game-dog-red rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Handshake className="w-10 h-10 text-white" />
              </div>
              <h4 className="text-athletic text-xl font-bold text-game-dog-black mb-2">Integrity</h4>
              <p className="text-gray-600 font-body">We do what's right, even when no one is watching. Character defines champions.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};