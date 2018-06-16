UPDATE comments_table
SET replies = 0;
WHERE id = $1
RETURNING *;