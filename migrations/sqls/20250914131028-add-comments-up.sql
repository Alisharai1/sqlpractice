CREATE TABLE IF NOT EXISTS comments(
    id VARCHAR(256) PRIMARY KEY,
    message text NOT NULL,
    user_id VARCHAR(256) REFERENCES users(id),
    post_id VARCHAR(256) REFERENCES posts(id),
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);