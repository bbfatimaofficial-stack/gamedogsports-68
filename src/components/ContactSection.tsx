import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Send, Users, Clock, TrendingUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    sport: '',
    message: '',
    honeypot: '' // Spam prevention field
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submission started');
    
    // Check honeypot field (should be empty)
    if (formData.honeypot.trim() !== '') {
      console.warn('Spam detected: honeypot field filled');
      // Silently ignore spam submissions
      return;
    }
    
    // Enhanced form validation
    if (!formData.name || !formData.email || !formData.message) {
      console.log('Form validation failed');
      toast({
        title: "Missing Information",
        description: "Please fill out all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Validate name length
    if (formData.name.trim().length < 2 || formData.name.trim().length > 100) {
      toast({
        title: "Invalid Name",
        description: "Name must be between 2 and 100 characters.",
        variant: "destructive"
      });
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }

    // Validate message length
    if (formData.message.trim().length < 10 || formData.message.trim().length > 2000) {
      toast({
        title: "Invalid Message",
        description: "Message must be between 10 and 2000 characters.",
        variant: "destructive"
      });
      return;
    }

    // Validate phone if provided
    if (formData.phone.trim() && formData.phone.replace(/\D/g, '').length < 10) {
      toast({
        title: "Invalid Phone",
        description: "Please enter a valid phone number.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    console.log('Starting database insertion...');

    try {
      // Insert consultation into database
      const insertData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        sport: formData.sport || null,
        message: formData.message
      };
      
      console.log('Inserting data into consultations table:', insertData);
      
      const { error } = await supabase
        .from('consultations')
        .insert(insertData);

      console.log('Database insert completed - error:', error);

      if (error) {
        console.error('Error inserting consultation:', error);
        toast({
          title: "Submission Failed",
          description: "There was an error submitting your consultation. Please try again.",
          variant: "destructive"
        });
        return;
      }

      // Trigger email notifications via Edge Function (include honeypot for server-side spam detection)
      console.log('Calling send-consultation-emails function...');
      const emailResponse = await supabase.functions.invoke('send-consultation-emails', {
        body: { ...insertData, honeypot: formData.honeypot }
      });

      console.log('Email function response:', emailResponse);

      if (emailResponse.error) {
        console.error('Email function error:', emailResponse.error);
        // Handle rate limiting error specifically
        if (emailResponse.error.message?.includes('Too many requests')) {
          toast({
            title: "Rate Limited",
            description: "Too many submissions. Please try again in an hour.",
            variant: "destructive"
          });
          return;
        }
        
        toast({
          title: "Submission Successful",
          description: "Your consultation request has been saved, but there may have been an issue sending email notifications. We'll still contact you soon!",
          variant: "default",
        });
      } else {
        // Check email delivery status from response
        const emailStatus = emailResponse.data?.emailStatus;
        
        if (emailStatus && !emailStatus.adminEmail) {
          console.warn('Admin email delivery failed:', emailStatus.adminError);
          toast({
            title: "Request Submitted Successfully",
            description: "Your request was received! Note: Admin notification may have failed - if urgent, please call us at 910-638-4342.",
            variant: "default",
          });
        } else {
          toast({
            title: "Consultation Request Submitted!",
            description: "We'll contact you within 24 hours to discuss your training goals.",
          });
        }
      }

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        sport: '',
        message: '',
        honeypot: ''
      });

    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: "Submission Failed",
        description: "There was an unexpected error. Please try again or contact us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
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
              Your championship journey begins with a single decision. Contact Game Dogs Sports today and discover what you're truly capable of achieving.
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
                <label className="text-white font-body font-semibold mb-2 block">Message * (10-2000 characters)</label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your goals, current training, and what you hope to achieve..."
                  rows={5}
                  className="bg-game-dog-gray-dark border-game-dog-gray-medium text-white placeholder-game-dog-gray-medium focus:border-game-dog-red resize-none"
                  required
                  maxLength={2000}
                />
                <div className="text-xs text-game-dog-gray-medium mt-1 text-right">
                  {formData.message.length}/2000
                </div>
              </div>

              {/* Honeypot field for spam prevention - hidden from users */}
              <div style={{ display: 'none' }} aria-hidden="true">
                <label htmlFor="honeypot">Leave this field empty</label>
                <input
                  type="text"
                  name="honeypot"
                  id="honeypot"
                  value={formData.honeypot}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full btn-game-dog text-lg py-4 flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                {isSubmitting ? 'Submitting...' : 'Contact Game Dogs Sports'}
              </Button>

              <p className="text-xs text-game-dog-gray-medium text-center font-body">
                By submitting this form, you agree to receive communications from Game Dogs Sports. We respect your privacy and will never share your information.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};