INSERT INTO comments_table (date, comment, user_id, meme_id, reply_id, likes, replies) VALUES ($1, $2, $3, $4, $5, 0, 0)
RETURNING *;