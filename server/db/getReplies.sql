SELECT comments_table.*, users.profile_picture, users.username
FROM comments_table
JOIN users ON users.id = comments_table.user_id
WHERE reply_id = $1
ORDER BY date DESC
LIMIT $2;