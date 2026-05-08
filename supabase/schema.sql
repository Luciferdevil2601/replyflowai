create extension if not exists "pgcrypto";

create table if not exists public.reply_history (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  customer_message text not null check (char_length(customer_message) between 5 and 1200),
  language text not null check (language in ('english', 'hindi', 'telugu')),
  business_type text not null default 'Other',
  replies jsonb not null,
  created_at timestamptz not null default now()
);

alter table public.reply_history enable row level security;

create policy "Users can read their own reply history"
on public.reply_history
for select
to authenticated
using (auth.uid() = user_id);

create policy "Users can insert their own reply history"
on public.reply_history
for insert
to authenticated
with check (auth.uid() = user_id);

create policy "Users can delete their own reply history"
on public.reply_history
for delete
to authenticated
using (auth.uid() = user_id);

create index if not exists reply_history_user_created_idx
on public.reply_history (user_id, created_at desc);
