create table if not exists public.florence_page_stats (
  page_id text primary key,
  visit_count bigint not null default 0,
  constraint florence_page_stats_visit_count_nonneg check (visit_count >= 0)
);

alter table public.florence_page_stats enable row level security;

insert into public.florence_page_stats (page_id, visit_count)
values ('landing', 0)
on conflict (page_id) do nothing;

revoke all on table public.florence_page_stats from anon, authenticated, public;

create or replace function public.get_florence_visit_count()
returns bigint
language sql
stable
security definer
set search_path = public
as $$
  select visit_count
  from public.florence_page_stats
  where page_id = 'landing';
$$;

create or replace function public.record_florence_visit()
returns bigint
language plpgsql
security definer
set search_path = public
as $$
declare
  next_count bigint;
begin
  update public.florence_page_stats
  set visit_count = visit_count + 1
  where page_id = 'landing'
  returning visit_count into next_count;

  if next_count is null then
    insert into public.florence_page_stats (page_id, visit_count)
    values ('landing', 1)
    returning visit_count into next_count;
  end if;

  return next_count;
end;
$$;

revoke all on function public.get_florence_visit_count() from public;
revoke all on function public.record_florence_visit() from public;
grant execute on function public.get_florence_visit_count() to anon, authenticated;
grant execute on function public.record_florence_visit() to anon, authenticated;
