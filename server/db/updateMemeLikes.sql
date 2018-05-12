UPDATE memes
SET likes = likes + 1
WHERE id = $1;
