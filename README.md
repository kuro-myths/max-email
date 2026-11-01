# Max Email

A unified inbox and private email archive for multiple providers, deployed on Vercel.

## Implemented foundation
- Next.js App Router + TypeScript
- Supabase magic-link authentication
- Gmail OAuth with read-only Gmail scope
- AES-256-GCM encryption for stored OAuth tokens
- Gmail initial import (up to 100 recent messages/account) with duplicate protection
- Supabase PostgreSQL schema and per-user RLS
- Unified inbox dashboard

## Setup and deployment
1. Supabase project `uopljljlsuxbogbhadhj` has the `mail_accounts` and `email_messages` schema and user-scoped RLS policies.
2. Enable Supabase email OTP/magic links. Set Site URL and redirect URL to `https://YOUR_VERCEL_DOMAIN/auth/callback`.
3. In Google Cloud, enable Gmail API and create OAuth web credentials. Add `https://YOUR_VERCEL_DOMAIN/api/oauth/google/callback` as an authorized redirect URI.
4. Add `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_REDIRECT_URI`, and `TOKEN_ENCRYPTION_KEY` to Vercel. Generate the encryption key with `openssl rand -base64 32`.
5. Sign in, connect Gmail, and click Sync. Gmail permission is read-only.

## Provider status
- Gmail: initial read-only connection and import implemented.
- Outlook/Microsoft 365: Graph OAuth adapter is not yet implemented.
- Proton Mail: requires Proton Mail Bridge on a persistent host and a separate IMAP sync worker; Bridge cannot run inside a Vercel serverless function.
- Generic IMAP: persistent worker adapter planned.
- Continuous background sync, incremental Gmail History API, full MIME parsing and attachment archival remain follow-up milestones. Vercel Functions are not an always-on worker.
