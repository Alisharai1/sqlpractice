ALTER TABLE posts
ADD created_at timestamptz DEFAULT now();
ALTER TABLE posts
ADD updated_at timestamptz DEFAULT now();