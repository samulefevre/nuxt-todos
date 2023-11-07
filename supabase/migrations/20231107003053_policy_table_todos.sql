create sequence "public"."todos_id_seq";

create table "public"."todos" (
    "id" integer not null default nextval('todos_id_seq'::regclass),
    "user_id" uuid not null,
    "title" text not null,
    "completed" boolean not null default false,
    "created_at" timestamp without time zone not null default now()
);


alter table "public"."todos" enable row level security;

alter sequence "public"."todos_id_seq" owned by "public"."todos"."id";

CREATE UNIQUE INDEX todos_pkey ON public.todos USING btree (id);

alter table "public"."todos" add constraint "todos_pkey" PRIMARY KEY using index "todos_pkey";

create policy "Enable all for users based on user_id"
on "public"."todos"
as permissive
for all
to public
using ((auth.uid() = user_id))
with check ((auth.uid() = user_id));



