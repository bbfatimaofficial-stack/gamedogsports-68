import coachNick from "@/assets/coach-nick-new.jpg";

export const AboutSection = () => {
  return (
    <section id="about" className="py-20 px-6 bg-game-dog-gray-light">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Coach Photo */}
          <div className="relative">
            <img 
              src={coachNick} 
              alt="Nick Maness - Head Coach at Game Dog Sports" 
              className="rounded-lg shadow-2xl w-full max-w-md mx-auto lg:max-w-full"
            />
            <div className="absolute -bottom-6 -right-6 bg-game-dog-red text-white p-4 rounded-lg font-athletic text-xl">
              Coach Nick
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <div>
              <div className="w-20 h-1 bg-game-dog-red mb-6"></div>
              <h2 className="text-athletic-heading text-5xl md:text-6xl text-game-dog-black mb-6">
                Meet Your Coach
              </h2>
            </div>

            <div className="space-y-6 text-lg text-gray-700 font-body leading-relaxed">
              <p>
                <strong className="text-game-dog-black">Nick Maness</strong> brings over 15 years of elite athletic training experience to Game Dog Sports. From working with high school prospects to collegiate athletes, Nick has developed a proven system that transforms raw talent into championship performance.
              </p>
              
              <p>
                His philosophy is simple: <em className="text-game-dog-red font-semibold">"Champions aren't born, they're forged through relentless training, unwavering discipline, and the courage to push beyond their limits."</em>
              </p>

              <p>
                At Game Dog Sports, we don't just train your body - we develop your mind, build your character, and ignite the competitive fire that separates champions from everyone else.
              </p>
            </div>

            <div className="bg-game-dog-black text-white p-6 rounded-lg">
              <h3 className="text-athletic-heading text-2xl mb-4 text-game-dog-red">
                Our Story: Built on Grit, Grounded in Results
              </h3>
              <p className="font-body">
                Game Dog Sports was founded on the belief that every athlete has untapped potential waiting to be unleashed. Through personalized training, cutting-edge techniques, and an uncompromising commitment to excellence, we've helped hundreds of athletes reach their peak performance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};