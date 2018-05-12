SELECT * FROM comments_table
WHERE meme_id = $1 
OFFSET $2
LIMIT 20;