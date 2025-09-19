-- Fix critical security vulnerability in consultations table
-- Drop the existing overly permissive policy that allows any authenticated user to see all consultations
DROP POLICY IF EXISTS "Only authenticated users can view consultations" ON public.consultations;

-- Create user_roles table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.user_roles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles table if not already enabled
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create or replace the security definer function to check admin role
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = auth.uid()
      AND role = 'admin'
  );
$$;

-- Create new restrictive RLS policy - ONLY admin users can view consultations
CREATE POLICY "Only admin users can view consultations"
ON public.consultations
FOR SELECT
TO authenticated
USING (public.is_admin());

-- Allow admins to update consultation status
CREATE POLICY "Only admin users can update consultations"
ON public.consultations
FOR UPDATE  
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Drop existing policies on user_roles if they exist
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Only admins can manage user roles" ON public.user_roles;

-- Create policy for user_roles table - users can only see their own roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- Only allow admins to manage roles (insert/update/delete)
CREATE POLICY "Only admins can manage user roles"
ON public.user_roles
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());