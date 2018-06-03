SELECT *
FROM comment_likes
WHERE user_id = $1 
AND meme_id = $2;