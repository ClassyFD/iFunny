SELECT comments_table.*, users.profile_picture, users.username
FROM comments_table
JOIN users ON users.id = comments_table.user_id
WHERE meme_id = $1 AND comments_table.id != $3 AND comments_table.id != $4 AND comments_table.reply_id IS NULL
ORDER BY date DESC
OFFSET $2
LIMIT 10;