/**
 * Production Database Schema (PostgreSQL for Supabase)
 * 
 * Paste this directly into your Supabase Dashboard SQL Editor (or migrations folder)
 * to instantly provision typed tables, RLS security policies, and real-time triggers
 * for all 8 Shared-UI demo applications.
 */

export const SUPABASE_SQL_SCHEMA = `-- ==============================================================================
-- SHARED-UI PRODUCTION DATABASE SCHEMA
-- Compatible with Supabase, Neon, AWS RDS Aurora, and standard PostgreSQL 15+
-- ==============================================================================

-- 1. E-COMMERCE ORDERS TABLE
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    shipping_address JSONB NOT NULL,
    line_items JSONB NOT NULL,
    subtotal_cents INTEGER NOT NULL,
    discount_cents INTEGER DEFAULT 0,
    shipping_cents INTEGER DEFAULT 0,
    total_cents INTEGER NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD' NOT NULL,
    stripe_charge_id TEXT,
    stripe_payment_intent_id TEXT,
    fulfillment_status TEXT DEFAULT 'pending' CHECK (fulfillment_status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
    receipt_sent BOOLEAN DEFAULT FALSE
);

-- 2. RESTAURANT TABLE RESERVATIONS
CREATE TABLE IF NOT EXISTS public.restaurant_reservations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_reference VARCHAR(20) UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    guest_name TEXT NOT NULL,
    guest_email TEXT NOT NULL,
    guest_phone TEXT,
    reservation_date DATE NOT NULL,
    time_slot VARCHAR(10) NOT NULL,
    guest_count SMALLINT NOT NULL CHECK (guest_count BETWEEN 1 AND 12),
    seating_zone TEXT NOT NULL, -- "Chef's Counter", "Glass Solarium", "Vaulted Cellar"
    sommelier_pairing BOOLEAN DEFAULT FALSE,
    dietary_notes TEXT,
    status TEXT DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'seated', 'cancelled', 'completed')),
    estimated_bill_eur INTEGER NOT NULL
);

-- 3. RETREAT & VILLA SANCTUARY BOOKINGS
CREATE TABLE IF NOT EXISTS public.villa_bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_reference VARCHAR(20) UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    villa_id VARCHAR(50) NOT NULL,
    villa_name TEXT NOT NULL,
    location_title TEXT NOT NULL,
    guest_name TEXT NOT NULL,
    guest_email TEXT NOT NULL,
    guest_phone TEXT,
    check_in_date DATE NOT NULL,
    nights_count SMALLINT NOT NULL,
    guests_count SMALLINT NOT NULL,
    concierge_yacht_charter BOOLEAN DEFAULT FALSE,
    concierge_helicopter_transfer BOOLEAN DEFAULT FALSE,
    concierge_private_chef BOOLEAN DEFAULT FALSE,
    special_requests TEXT,
    total_amount_eur INTEGER NOT NULL,
    payment_status TEXT DEFAULT 'authorized' CHECK (payment_status IN ('authorized', 'paid', 'refunded'))
);

-- 4. REAL-TIME WORKSPACE CHAT MESSAGES
CREATE TABLE IF NOT EXISTS public.chat_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    channel VARCHAR(60) NOT NULL, -- e.g. '#design-systems', '#engineering-core'
    sender_type TEXT DEFAULT 'user' CHECK (sender_type IN ('user', 'bot', 'colleague')),
    author_name TEXT NOT NULL,
    author_role TEXT,
    author_avatar_url TEXT,
    content_text TEXT NOT NULL,
    code_snippet TEXT,
    code_language VARCHAR(30),
    reactions JSONB DEFAULT '{}'::jsonb,
    parent_message_id UUID REFERENCES public.chat_messages(id) ON DELETE CASCADE,
    is_pinned BOOLEAN DEFAULT FALSE
);

-- 5. CREATOR SOCIAL POSTS & POLLS
CREATE TABLE IF NOT EXISTS public.social_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    author_name TEXT NOT NULL,
    author_handle TEXT NOT NULL,
    author_avatar_url TEXT,
    content TEXT NOT NULL,
    tags TEXT[] DEFAULT '{}',
    likes_count INTEGER DEFAULT 0,
    reposts_count INTEGER DEFAULT 0,
    poll_question TEXT,
    poll_options JSONB DEFAULT '[]'::jsonb,
    media_urls TEXT[] DEFAULT '{}'
);

-- 6. EDITORIAL ARTICLES & DISPATCHES
CREATE TABLE IF NOT EXISTS public.editorial_articles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    rubric TEXT NOT NULL, -- e.g. "Theory & Motion", "Systems Architecture"
    lead_excerpt TEXT NOT NULL,
    pull_quote TEXT,
    read_time_minutes SMALLINT NOT NULL,
    author_name TEXT NOT NULL,
    author_role TEXT,
    claps_count INTEGER DEFAULT 0,
    body_paragraphs TEXT[] NOT NULL
);

-- 7. ENABLE ROW-LEVEL SECURITY (RLS) FOR PUBLIC ACCESS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.restaurant_reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.villa_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.editorial_articles ENABLE ROW LEVEL SECURITY;

-- Allow anonymous clients to read and insert for demo purposes
CREATE POLICY "Allow public read access on chat" ON public.chat_messages FOR SELECT USING (true);
CREATE POLICY "Allow public insert access on chat" ON public.chat_messages FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read access on social" ON public.social_posts FOR SELECT USING (true);
CREATE POLICY "Allow public insert access on social" ON public.social_posts FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public insert on orders" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert on reservations" ON public.restaurant_reservations FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert on villa bookings" ON public.villa_bookings FOR INSERT WITH CHECK (true);

-- Enable Supabase Realtime for instant multi-user Chat & Social updates
ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.social_posts;
`;
