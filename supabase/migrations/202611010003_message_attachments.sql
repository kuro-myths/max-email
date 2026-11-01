alter table public.email_messages add column if not exists attachments jsonb not null default '[]'::jsonb;
