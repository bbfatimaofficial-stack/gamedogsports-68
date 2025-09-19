-- Clean up conflicting RLS policies on consultations table
DROP POLICY IF EXISTS "Admin only consultation access" ON public.consultations;
DROP POLICY IF EXISTS "Admin consultation updates" ON public.consultations;
DROP POLICY IF EXISTS "Anyone can insert consultations" ON public.consultations;
DROP POLICY IF EXISTS "Only admin users can view consultations" ON public.consultations;
DROP POLICY IF EXISTS "Only admin users can update consultations" ON public.consultations;

-- Create clean, non-conflicting policies
-- Allow anyone (including unauthenticated users) to insert consultations
CREATE POLICY "Public can submit consultations"
ON public.consultations
FOR INSERT
WITH CHECK (true);

-- Only admins can view consultations
CREATE POLICY "Admins can view consultations"
ON public.consultations
FOR SELECT
TO authenticated
USING (public.is_admin());

-- Only admins can update consultations
CREATE POLICY "Admins can update consultations"
ON public.consultations
FOR UPDATE
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());