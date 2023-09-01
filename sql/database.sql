CREATE TABLE IF NOT EXISTS public.users(
    id SERIAL PRIMARY KEY,
    name VARCHAR
);

CREATE TABLE IF NOT EXISTS public.phone(
    id SERIAL PRIMARY KEY,
    operator VARCHAR,
    ddd VARCHAR,
    number VARCHAR,
    user_id INTEGER,
  
    CONSTRAINT phone_number_to_user FOREIGN KEY (user_id) REFERENCES public.users ON DELETE SET NULL ON UPDATE CASCADE
);