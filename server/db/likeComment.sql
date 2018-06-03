INSERT INTO comment_likes (time_liked, user_id, meme_id, comment_id) VALUES ($1, $2, $3, $4)
RETURNING *;