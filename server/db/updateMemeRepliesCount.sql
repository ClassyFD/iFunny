UPDATE comments_table
SET replies = replies - 1
WHERE id = $1;