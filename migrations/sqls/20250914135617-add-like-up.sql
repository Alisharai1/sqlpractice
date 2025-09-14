CREATE TABLE IF NOT EXISTS likes(
    id VARCHAR(256) PRIMARY KEY,
    user_id VARCHAR(256) REFERENCES users(id),
    post_id VARCHAR(256) REFERENCES posts(id),
    created_at timestamptz DEFAULT now()
);