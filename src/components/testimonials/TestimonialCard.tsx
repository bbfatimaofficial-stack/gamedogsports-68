import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote, Star, TrendingUp } from "lucide-react";

interface TestimonialCardProps {
  testimonial: {
    name: string;
    role: string;
    quote: string;
    achievement: string;
    avatar: string;
    image: string;
    icon: any;
    sport: string;
    improvement: string;
    color: string;
  };
}

export const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
  const IconComponent = testimonial.icon;

  return (
    <div className="relative bg-card rounded-3xl p-8 md:p-12 shadow-2xl border border-border backdrop-blur-sm overflow-hidden group transition-all duration-500 hover:shadow-xl">
      {/* Header with Avatar and Stats */}
      <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
        <div className="flex items-center gap-6">
          <div className="relative">
            <Avatar className="w-20 h-20 ring-4 ring-primary/20 transition-all duration-300 group-hover:ring-primary/40">
              <AvatarImage 
                src={testimonial.image} 
                alt={testimonial.name}
                className="object-cover"
              />
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
                {testimonial.avatar}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-2 -right-2 bg-primary rounded-full p-2 shadow-lg">
              <IconComponent className="w-5 h-5 text-primary-foreground" />
            </div>
          </div>
          <div>
            <h4 className="text-athletic-heading text-2xl md:text-3xl text-foreground mb-1">
              {testimonial.name}
            </h4>
            <p className="text-muted-foreground font-body text-lg">
              {testimonial.role}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold">
                {testimonial.sport}
              </span>
            </div>
          </div>
        </div>
        
        {/* Performance Stats */}
        <div className="bg-primary p-6 rounded-2xl text-primary-foreground shadow-lg ml-auto">
          <div className="text-center">
            <TrendingUp className="w-8 h-8 mx-auto mb-2" />
            <div className="text-2xl font-bold">{testimonial.improvement}</div>
            <div className="text-sm opacity-90">Improvement</div>
          </div>
        </div>
      </div>

      {/* Quote Section */}
      <div className="relative">
        <Quote className="w-12 h-12 text-primary/30 absolute -top-4 -left-2" />
        <blockquote className="text-xl md:text-2xl text-foreground font-body leading-relaxed pl-8 mb-8">
          {testimonial.quote}
        </blockquote>
      </div>

      {/* Achievement Badge */}
      <div className="flex justify-center">
        <div className="bg-primary text-primary-foreground px-8 py-4 rounded-2xl font-bold text-lg flex items-center gap-3 shadow-lg">
          <Star className="w-6 h-6 fill-current" />
          <span>{testimonial.achievement}</span>
        </div>
      </div>
    </div>
  );
};