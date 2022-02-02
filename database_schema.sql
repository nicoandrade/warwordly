-- Custom types
DROP TYPE IF EXISTS public.battle_status;
CREATE TYPE public.battle_status as enum ('pending', 'started', 'ended');

CREATE TABLE public.users (
    "id" uuid NOT NULL PRIMARY KEY, -- UUID from auth.users
    "username" VARCHAR(255) UNIQUE,
    "email" VARCHAR(255),
    "display_name" VARCHAR(255),
    "image" VARCHAR(255),
    "description" VARCHAR(255),
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
comment on table public.users is 'Profile data for each user.';
comment on column public.users.id is 'References the internal Supabase Auth user.';

CREATE TABLE "battles"(
    "id" UUID NOT NULL PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
    "player1" UUID references public.users NOT NULL,
    "player2" UUID references public.users,
    "winner" UUID references public.users,
    "solution" VARCHAR(255),
    "guesses1" VARCHAR(255) ARRAY,
    "guesses2" VARCHAR(255) ARRAY,
    "language" VARCHAR(7) DEFAULT 'en',
    "amount_letters" INTEGER DEFAULT 5,
    "amount_guesses" INTEGER DEFAULT 6,
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    "status" battle_status DEFAULT 'pending'::public.battle_status
);

-- Secure the tables
alter table public.users enable row level security;
create policy "users Allow logged-in read access" on public.users for SELECT using ( auth.uid() = id );
create policy "users Allow individual insert access" on public.users for INSERT with check ( auth.uid() = id );
create policy "users Allow individual update access" on public.users for UPDATE using ( auth.uid() = id );

alter table public.battles enable row level security;
create policy "battles Allow individual SELECT" on public.battles for SELECT using ( auth.role() = 'authenticated' );
create policy "battles Allow individual INSERT" on public.battles for INSERT with check ( auth.role() = 'authenticated' );
create policy "battles Allow individual UPDATE" on public.battles for UPDATE using ( auth.role() = 'authenticated' );


-- Enable Realtime for certain tables
begin; 
  -- remove the realtime publication
  drop publication if exists supabase_realtime; 

  -- re-create the publication but don't enable it for any tables
  create publication supabase_realtime;  
commit;

-- add a table to the publication
alter publication supabase_realtime add table battles;


-- inserts a row into public.users and assigns roles
CREATE OR REPLACE FUNCTION public.handle_new_user()
returns trigger as $$
begin
    -- Insert new user into users table
    insert into public.users (id, email)
    values (new.id, new.email);

    return new;
end;
$$ language plpgsql security definer;

-- trigger the function every time a user is created
DROP TRIGGER IF EXISTS on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- Update updated_at on each modification
-- - This function can be used to update any table with a "updated_at" column
CREATE OR REPLACE FUNCTION update_modified_column_global() 
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW; 
END;
$$ language 'plpgsql';

-- - Update battles on modification
DROP TRIGGER IF EXISTS update_battles_modtime on public.battles;
CREATE TRIGGER update_battles_modtime BEFORE UPDATE ON public.battles FOR EACH ROW EXECUTE PROCEDURE update_modified_column_global();
