INSERT INTO likes (time_liked, user_id, meme_id) VALUES ($1, $2, $3)
RETURNING *;