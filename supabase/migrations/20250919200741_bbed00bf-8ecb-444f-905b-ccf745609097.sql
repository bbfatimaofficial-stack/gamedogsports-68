-- Drop the existing admin-only SELECT policy to replace with a more comprehensive one
DROP POLICY IF EXISTS "Admins can view consultations" ON public.consultations;

-- Create a comprehensive SELECT policy that explicitly allows only admins
CREATE POLICY "Only admins can view consultations" 
ON public.consultations 
FOR SELECT 
USING (
  -- Only allow if user is authenticated AND is an admin
  auth.uid() IS NOT NULL AND public.is_admin()
);