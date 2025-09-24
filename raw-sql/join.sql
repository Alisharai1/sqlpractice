-- SELECT p.id,
--     p.description,
--     u.email,
--     u.name
-- FROM posts AS p
--     JOIN users AS u ON u.id = p.user_id;
SELECT *
FROM comments AS c
    JOIN posts AS p ON c.post_id = p.id
    JOIN users AS u ON u.id = c.user_id;