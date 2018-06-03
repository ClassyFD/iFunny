UPDATE comments_table
SET likes = likes - 1
WHERE id = $1;