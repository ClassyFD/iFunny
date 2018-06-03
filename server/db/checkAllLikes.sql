SELECT *
FROM likes
WHERE user_id = $1
LIMIT $2;