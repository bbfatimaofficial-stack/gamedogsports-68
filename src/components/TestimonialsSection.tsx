import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Target, Award, TrendingUp, Star } from "lucide-react";
import { TestimonialCard } from "./testimonials/TestimonialCard";
import { TestimonialNavigation } from "./testimonials/TestimonialNavigation";
import marcusImg from "@/assets/marcus-rodriguez.jpg";
import sarahImg from "@/assets/sarah-chen.jpg";
import davidImg from "@/assets/david-thompson.jpg";
import alexImg from "@/assets/alex-martinez.jpg";

export const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Marcus Rodriguez",
      role: "High School Baseball Player",
      quote: "Game Dogs Sports completely transformed my game. I went from riding the bench to starting varsity and getting college scouts at my games. Coach Nick doesn't just train your body - he builds champions.",
      achievement: "Varsity Starter • College Recruit",
      avatar: "MR",
      image: marcusImg,
      icon: Award,
      sport: "Baseball",
      improvement: "+40% Performance",
      color: "from-blue-500 to-purple-600"
    },
    {
      name: "Sarah Chen", 
      role: "Track & Field Athlete",
      quote: "The speed training program is incredible. I dropped 0.3 seconds off my 100m time in just 8 weeks. The mental performance coaching gave me the confidence to compete at state level.",
      achievement: "State Qualifier • School Record Holder",
      avatar: "SC",
      image: sarahImg,
      icon: TrendingUp,
      sport: "Track & Field",
      improvement: "0.3s Faster",
      color: "from-green-500 to-teal-600"
    },
    {
      name: "David Thompson",
      role: "Parent", 
      quote: "My son was struggling with confidence on the field. After 6 months at Game Dogs Sports, he's not only a better player but a more confident young man. The character development is just as important as the athletic training.",
      achievement: "Proud Parent • Life Changed",
      avatar: "DT",
      image: davidImg,
      icon: Star,
      sport: "Development",
      improvement: "100% Confidence",
      color: "from-orange-500 to-red-600"
    },
    {
      name: "Alex Martinez",
      role: "College Baseball Player",
      quote: "I trained here every summer during high school. The strength and conditioning program prepared me for Division I baseball. I still use the mental techniques Coach Nick taught me during clutch moments.",
      achievement: "D1 Scholarship • All-Conference", 
      avatar: "AM",
      image: alexImg,
      icon: Award,
      sport: "Baseball",
      improvement: "D1 Ready",
      color: "from-purple-500 to-pink-600"
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