import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Target, Award, TrendingUp, Star, Heart, Flame } from "lucide-react";
import { TestimonialCard } from "./testimonials/TestimonialCard";
import { TestimonialNavigation } from "./testimonials/TestimonialNavigation";
import amberWParent from "@/assets/amber-w-parent.jpg";
import jamarWParent from "@/assets/jamar-w-parent.jpg";
import shatinaSParent from "@/assets/shatina-s-parent.jpg";

export const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Amber W.",
      role: "Parent",
      quote: "Coach Nick has truly been a game-changer for my son. After a difficult experience with a previous coach, my son had lost his love for baseball and his confidence was at an all-time low. Coach Nick not only restored his passion for the game but also built him back up as a player and a person. Through his knowledge, encouragement, and genuine passion, Coach Nick has elevated my son's performance to an entirely new level. He now steps onto the high school field with confidence, excitement, and the skills to succeed.",
      achievement: "Restored Passion • High School Success",
      avatar: "AW",
      image: amberWParent,
      icon: Heart,
      sport: "Baseball",
      improvement: "Complete Transformation",
      color: "from-pink-500 to-rose-600"
    },
    {
      name: "Jamar W.", 
      role: "Parent",
      quote: "My daughter began training with Coach Nick at just 9 years old, and the transformation has been incredible. Coach Nick has a gift for inspiring her and pushing her to reach her full potential. She looks forward to every session, and always leaves motivated, confident, and ready to take on the world. Thanks to his guidance, my daughter now steps onto the softball field with confidence and composure, even under pressure.",
      achievement: "9 Years Old to Star • Pressure Performer",
      avatar: "JW",
      image: jamarWParent,
      icon: Star,
      sport: "Softball",
      improvement: "Unmatched Confidence",
      color: "from-blue-500 to-indigo-600"
    },
    {
      name: "Shatina S.",
      role: "Parent", 
      quote: "Coach Nick has been an incredible influence on my son, both in baseball and track. Through his focus on building not just physical strength but also the mental side of the game, my son has grown tremendously. He's now placing in the top 3 for track and dominating on the baseball field with a new level of confidence. What I love most is seeing the young man my son has become through Coach Nick's mentorship—stronger, more resilient, and truly believing in himself.",
      achievement: "Top 3 Track • Baseball Domination",
      avatar: "SS",
      image: shatinaSParent,
      icon: TrendingUp,
      sport: "Multi-Sport",
      improvement: "Mental & Physical Growth",
      color: "from-green-500 to-emerald-600"
    },
    {
      name: "Londyn Williams",
      role: "Athlete",
      quote: "He pushes me to the next level, and he does this by making sure my skills and mental game are the strongest. He is my favorite coach.",
      achievement: "Class of 2033 • Rising Star", 
      avatar: "LW",
      icon: Flame,
      sport: "Baseball",
      improvement: "Skills & Mental Game",
      color: "from-orange-500 to-amber-600",
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <section id="testimonials" className="py-20 px-6 bg-game-dog-gray-dark">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-athletic-hero text-6xl md:text-7xl text-white mb-6">
            Hard Work. <span className="text-game-dog-red animate-underline-sweep">Real Results.</span>
          </h2>
          <p className="text-xl text-game-dog-gray-light max-w-3xl mx-auto font-body">
            Don't take our word for it. Hear from the athletes and families whose lives we've transformed.
          </p>
        </div>

        {/* Testimonial Showcase */}
        <div className="relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-10 left-10 w-32 h-32 bg-game-dog-red/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-20 right-16 w-24 h-24 bg-game-dog-red/15 rounded-full blur-lg"></div>
          </div>

          {/* Main Testimonial Card */}
          <TestimonialCard testimonial={testimonials[currentTestimonial]} />

          {/* Navigation */}
          <TestimonialNavigation
            currentTestimonial={currentTestimonial}
            totalTestimonials={testimonials.length}
            onPrevious={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
            onNext={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
            onSelect={setCurrentTestimonial}
            testimonials={testimonials}
          />
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-game-dog-gray-light mb-8 text-lg font-body">
            Ready to write your own success story?
          </p>
          <Button 
            className="btn-game-dog text-xl px-12 py-6 flex items-center gap-3 mx-auto"
            onClick={() => {
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            <Target className="w-6 h-6" />
            Join the Pack
          </Button>
        </div>
      </div>
    </section>
  );
};