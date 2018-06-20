UPDATE memes
SET featured = 1
WHERE id = $1;
UPDATE users
SET featured = featured + 1
WHERE id = $2;