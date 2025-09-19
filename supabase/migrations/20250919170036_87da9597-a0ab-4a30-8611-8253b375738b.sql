-- Create consultations table for form submissions
CREATE TABLE public.consultations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  sport TEXT,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.consultations ENABLE ROW LEVEL SECURITY;

-- Create policies - Allow anyone to insert (form submissions are public)
-- But only allow reading for authenticated users (future admin dashboard)
CREATE POLICY "Anyone can insert consultations" 
ON public.consultations 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Only authenticated users can view consultations" 
ON public.consultations 
FOR SELECT 
USING (auth.role() = 'authenticated');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_consultations_updated_at
BEFORE UPDATE ON public.consultations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for better performance on common queries
CREATE INDEX idx_consultations_created_at ON public.consultations(created_at DESC);
CREATE INDEX idx_consultations_status ON public.consultations(status);
CREATE INDEX idx_consultations_email ON public.consultations(email);