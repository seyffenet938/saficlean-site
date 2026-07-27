-- Create bookings table for SafiClean reservations
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  
  -- Step 1: Service selection
  service TEXT NOT NULL,
  furniture_details JSONB DEFAULT '[]',
  
  -- Step 2: Address
  address TEXT NOT NULL,
  postal_code TEXT NOT NULL,
  city TEXT NOT NULL,
  floor TEXT,
  access_code TEXT,
  
  -- Step 3: Date/Time
  preferred_date DATE NOT NULL,
  preferred_time TEXT NOT NULL,
  
  -- Step 4: Contact
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  notes TEXT,
  
  -- Metadata
  estimated_price INTEGER,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled'))
);

-- Enable RLS
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (public booking form)
CREATE POLICY "Allow anonymous inserts" ON public.bookings
  FOR INSERT
  WITH CHECK (true);
