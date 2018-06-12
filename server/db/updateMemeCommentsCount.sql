UPDATE memes
SET comments = comments - 1
WHERE id = $1;