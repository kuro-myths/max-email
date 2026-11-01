revoke all on public.mail_accounts from anon;
revoke all on public.email_messages from anon;
grant select,insert,update,delete on public.mail_accounts to authenticated;
grant select,insert,update on public.email_messages to authenticated;
create policy "Users insert own email messages" on public.email_messages for insert to authenticated with check ((select auth.uid())=user_id);
create policy "Users update own email messages" on public.email_messages for update to authenticated using ((select auth.uid())=user_id) with check ((select auth.uid())=user_id);
