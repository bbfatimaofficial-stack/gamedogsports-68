import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Send, Users, Clock, TrendingUp } from "lucide-react";

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    sport: '',
    message: ''
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple form validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill out all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Simulate form submission
    toast({
      title: "Message Sent Successfully!",
      description: "We'll contact you within 24 hours to discuss your training goals.",
    });

    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      sport: '',
      message: ''
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div>
            <h2 className="text-athletic-hero text-6xl md:text-7xl text-game-dog-black mb-8">
              Ready to <span className="text-game-dog-red">Start?</span>
            </h2>
            
            <p className="text-xl text-game-dog-gray-dark mb-12 font-body leading-relaxed">
              Your championship journey begins with a single decision. Contact Game Dog Sports today and discover what you're truly capable of achieving.
            </p>

            {/* Contact Cards */}
            <div className="space-y-6 mb-12">
              <div className="bg-game-dog-gray-light p-6 rounded-lg border-l-4 border-game-dog-red hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Mail className="w-6 h-6 text-game-dog-red mr-4" />
                    <h3 className="text-athletic text-xl font-bold text-game-dog-black">Email</h3>
                  </div>
                  <Button
                    onClick={() => window.open('mailto:ContactcarolinaGD@gmail.com', '_blank')}
                    className="btn-game-dog text-sm px-4 py-2"
                  >
                    Send Email
                  </Button>
                </div>
                <p className="text-game-dog-gray-dark font-body">ContactcarolinaGD@gmail.com</p>
              </div>

              <div className="bg-game-dog-gray-light p-6 rounded-lg border-l-4 border-game-dog-red hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Phone className="w-6 h-6 text-game-dog-red mr-4" />
                    <h3 className="text-athletic text-xl font-bold text-game-dog-black">Phone</h3>
                  </div>
                  <Button
                    onClick={() => window.open('tel:910-638-4342', '_self')}
                    className="btn-game-dog text-sm px-4 py-2"
                  >
                    Call Now
                  </Button>
                </div>
                <p className="text-game-dog-gray-dark font-body">910-638-4342</p>
              </div>

              <div className="bg-game-dog-gray-light p-6 rounded-lg border-l-4 border-game-dog-red hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <MapPin className="w-6 h-6 text-game-dog-red mr-4" />
                    <h3 className="text-athletic text-xl font-bold text-game-dog-black">Location</h3>
                  </div>
                  <Button
                    onClick={() => window.open('https://maps.google.com/maps?q=1122+Hawkins+Ave,+Sanford,+NC+27330', '_blank')}
                    className="btn-game-dog text-sm px-4 py-2"
                  >
                    Get Directions
                  </Button>
                </div>
                <p className="text-game-dog-gray-dark font-body">1122 Hawkins Ave<br />Sanford, NC 27330</p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <Users className="w-8 h-8 text-game-dog-red mx-auto mb-2" />
                <div className="text-3xl font-bold text-game-dog-red">500+</div>
                <div className="text-sm text-game-dog-gray-dark font-body">Athletes Trained</div>
              </div>
              <div className="text-center">
                <Clock className="w-8 h-8 text-game-dog-red mx-auto mb-2" />
                <div className="text-3xl font-bold text-game-dog-red">15</div>
                <div className="text-sm text-game-dog-gray-dark font-body">Years Experience</div>
              </div>
              <div className="text-center">
                <TrendingUp className="w-8 h-8 text-game-dog-red mx-auto mb-2" />
                <div className="text-3xl font-bold text-game-dog-red">95%</div>
                <div className="text-sm text-game-dog-gray-dark font-body">Success Rate</div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-game-dog-black p-10 rounded-2xl">
            <h3 className="text-athletic-heading text-3xl text-white mb-2">
              Get Your <span className="text-game-dog-red">Free Consultation</span>
            </h3>
            <p className="text-game-dog-gray-light mb-8 font-body">
              Fill out the form below and we'll contact you within 24 hours to discuss your training goals.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-white font-body font-semibold mb-2 block">Name *</label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className="bg-game-dog-gray-dark border-game-dog-gray-medium text-white placeholder-game-dog-gray-medium focus:border-game-dog-red"
                    required
                  />
                </div>
                <div>
                  <label className="text-white font-body font-semibold mb-2 block">Email *</label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="bg-game-dog-gray-dark border-game-dog-gray-medium text-white placeholder-game-dog-gray-medium focus:border-game-dog-red"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-white font-body font-semibold mb-2 block">Phone</label>
                  <Input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(555) 123-4567"
                    className="bg-game-dog-gray-dark border-game-dog-gray-medium text-white placeholder-game-dog-gray-medium focus:border-game-dog-red"
                  />
                </div>
                <div>
                  <label className="text-white font-body font-semibold mb-2 block">Primary Sport</label>
                  <select
                    name="sport"
                    value={formData.sport}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-game-dog-gray-dark border border-game-dog-gray-medium text-white rounded-md focus:border-game-dog-red focus:outline-none"
                  >
                    <option value="">Select your sport</option>
                    <option value="baseball">Baseball</option>
                    <option value="softball">Softball</option>
                    <option value="football">Football</option>
                    <option value="basketball">Basketball</option>
                    <option value="track">Track & Field</option>
                    <option value="soccer">Soccer</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-white font-body font-semibold mb-2 block">Message *</label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your goals, current training, and what you hope to achieve..."
                  rows={5}
                  className="bg-game-dog-gray-dark border-game-dog-gray-medium text-white placeholder-game-dog-gray-medium focus:border-game-dog-red resize-none"
                  required
                />
              </div>

              <Button type="submit" className="w-full btn-game-dog text-lg py-4 flex items-center justify-center gap-2">
                <Send className="w-5 h-5" />
                Contact Game Dog Sports
              </Button>

              <p className="text-xs text-game-dog-gray-medium text-center font-body">
                By submitting this form, you agree to receive communications from Game Dog Sports. We respect your privacy and will never share your information.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};