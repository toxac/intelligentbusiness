-- Supabase schema for Zeitgeist Ascend
-- Run this in your Supabase SQL editor

-- Enable pgcrypto for gen_random_uuid
create extension if not exists pgcrypto;

-- Leads table: holds all lead types (newsletter, assessment, webinar)
create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  name text,
  lead_type text,
  company_size text,
  area text,
  metadata jsonb,
  created_at timestamptz default now()
);

-- Assessments table
create table if not exists assessments (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references leads(id) on delete set null,
  score int,
  responses jsonb,
  created_at timestamptz default now()
);

-- Webinar registrations table
-- Webinars (events)
create table if not exists webinars (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  scheduled_at timestamptz,
  duration_minutes int,
  price numeric,
  capacity int,
  metadata jsonb,
  created_at timestamptz default now()
);

-- Registrations for webinars (attendees)
create table if not exists registrations (
  id uuid primary key default gen_random_uuid(),
  webinar_id uuid references webinars(id) on delete set null,
  lead_id uuid references leads(id) on delete set null,
  name text,
  email text,
  company_size text,
  area text,
  payment_status text,
  payment_id text,
  amount_paid numeric,
  metadata jsonb,
  created_at timestamptz default now()
);

-- Prevent duplicate registrations for the same webinar/email (case-insensitive)
create unique index if not exists registrations_webinar_email_idx on registrations (webinar_id, lower(email));

-- Optional table to log email sends (used by send-email endpoint)
create table if not exists emails (
  id uuid primary key default gen_random_uuid(),
  to text not null,
  subject text,
  body jsonb,
  assessment_id uuid references assessments(id) on delete set null,
  sent_at timestamptz default null,
  created_at timestamptz default now()
);
