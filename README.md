# Max Email

A unified inbox and private email archive for multiple providers, deployed on Vercel.

## Implemented
- Next.js App Router + TypeScript dashboard
- Supabase magic-link authentication and user-scoped RLS
- Gmail OAuth with read-only scope
- AES-256-GCM encrypted OAuth refresh-token storage
- Gmail initial importer (up to 100 recent messages/account), full text/html MIME body extraction and attachment metadata
- Duplicate protection by account + provider message ID
- Protected Vercel Cron endpoint for scheduled Gmail archive sync (daily schedule)

## Required configuration
1. Supabase project `uopljljlsuxbogbhadhj` has `mail_accounts` and `email_messages` tables with owner-based RLS policies.
2. In Supabase Auth URL Configuration, set Site URL to `https://max-email-kuros-projects-5211db6f.vercel.app` and add redirect `https://max-email-kuros-projects-5211db6f.vercel.app/auth/callback`.
3. In Google Cloud, enable Gmail API and create OAuth Web credentials. Add `https://max-email-kuros-projects-5211db6f.vercel.app/api/oauth/google/callback` as an authorized redirect URI.
4. Vercel already has Supabase URL, anon key, token encryption key, APP_URL, GOOGLE_REDIRECT_URI and CRON_SECRET. Add `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, and `SUPABASE_SERVICE_ROLE_KEY` (encrypted) to project environment variables.
5. Supabase Auth magic-link email provider must be enabled. Sign in, connect Gmail, and click Sync to test.

## Provider support status
- Gmail: OAuth connection and read-only message import implemented; daily cron endpoint implemented.
- Outlook/Microsoft 365: Microsoft Graph OAuth adapter not yet implemented.
- Proton Mail: requires Proton Mail Bridge on a persistent host and a separate IMAP sync worker; Bridge cannot run inside a Vercel serverless function.
- Generic IMAP: persistent worker adapter planned.
- Attachment metadata is archived, but attachment binary files are not yet downloaded to Storage.
- Vercel Hobby cron is daily; more frequent schedules require a plan that supports them or an external worker/scheduler.
