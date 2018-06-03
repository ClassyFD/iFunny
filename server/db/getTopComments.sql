SELECT comments_table.*, users.profile_picture, users.username
FROM comments_table
JOIN users ON users.id = comments_table.user_id
WHERE meme_id = $1 AND reply_id IS NULL
ORDER BY likes DESC
LIMIT 2;