-- Create consultations table for storing contact form submissions
CREATE TABLE public.consultations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  sport TEXT,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.consultations ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert consultations (public contact form)
CREATE POLICY "Anyone can submit consultations"
ON public.consultations
FOR INSERT
WITH CHECK (true);

-- Only admins can view consultations (you'll need to set up admin access separately)
CREATE POLICY "Service role can view all consultations"
ON public.consultations
FOR SELECT
USING (auth.role() = 'service_role');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_consultations_updated_at
BEFORE UPDATE ON public.consultations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Add index for better query performance
CREATE INDEX idx_consultations_created_at ON public.consultations(created_at DESC);
CREATE INDEX idx_consultations_status ON public.consultations(status);