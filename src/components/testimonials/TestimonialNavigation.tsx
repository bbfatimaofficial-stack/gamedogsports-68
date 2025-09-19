import { ChevronLeft, ChevronRight } from "lucide-react";

interface TestimonialNavigationProps {
  currentTestimonial: number;
  totalTestimonials: number;
  onPrevious: () => void;
  onNext: () => void;
  onSelect: (index: number) => void;
  testimonials: Array<{ name: string }>;
}

export const TestimonialNavigation = ({
  currentTestimonial,
  totalTestimonials,
  onPrevious,
  onNext,
  onSelect,
  testimonials
}: TestimonialNavigationProps) => {
  return (
    <div className="flex justify-center items-center mt-12 gap-8">
      {/* Previous Button */}
      <button
        onClick={onPrevious}
        className="bg-card hover:bg-primary text-primary hover:text-primary-foreground p-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110 group"
        aria-label="Previous testimonial"
      >
        <ChevronLeft className="w-6 h-6 transition-transform group-hover:-translate-x-1" />
      </button>

      {/* Dots Navigation */}
      <div className="flex space-x-4">
        {testimonials.map((testimonial, index) => (
          <button
            key={index}
            onClick={() => onSelect(index)}
            className={`transition-all duration-300 ${
              index === currentTestimonial 
                ? 'w-12 h-4 bg-primary rounded-full' 
                : 'w-4 h-4 bg-muted hover:bg-muted-foreground/50 rounded-full transform hover:scale-125'
            }`}
            aria-label={`View ${testimonial.name}'s testimonial`}
          />
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={onNext}
        className="bg-card hover:bg-primary text-primary hover:text-primary-foreground p-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110 group"
        aria-label="Next testimonial"
      >
        <ChevronRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
      </button>
    </div>
  );
};