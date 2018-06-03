DELETE FROM comment_likes
WHERE user_id = $1 AND comment_id = $2;