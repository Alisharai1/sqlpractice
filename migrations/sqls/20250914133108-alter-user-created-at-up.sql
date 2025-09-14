-- updating user table with created_at
ALTER TABLE users
ADD created_at timestamptz DEFAULT now();

ALTER TABLE users
ADD updated_at timestamptz DEFAULT now();

