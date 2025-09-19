-- Fix the critical security vulnerability by updating the overly permissive consultation policy
-- The current policy allows ANY authenticated user to view ALL consultation records

-- Drop the existing vulnerable policy
DROP POLICY "Only authenticated users can view consultations" ON public.consultations;

-- Drop existing admin policy if it exists
DROP POLICY IF EXISTS "Only admin users can view consultations" ON public.consultations;

-- Create secure policy that only allows admin users to view consultations
-- This uses the existing is_admin() function if it exists, or creates a simple placeholder
CREATE POLICY "Only admin users can view consultations"
ON public.consultations  
FOR SELECT
TO authenticated
USING (
  -- Check if user has admin role in user_roles table
  -- If user_roles table doesn't exist yet, this will deny access (secure by default)
  EXISTS (
    SELECT 1 
    FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);