-- Create storage bucket for public assets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('assets', 'assets', true, 10485760, ARRAY['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp']);

-- Create RLS policies for the assets bucket to allow public access
CREATE POLICY "Allow public read access on assets bucket"
ON storage.objects FOR SELECT
USING (bucket_id = 'assets');

CREATE POLICY "Allow authenticated users to upload to assets bucket"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'assets' AND auth.role() = 'authenticated');