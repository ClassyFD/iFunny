DELETE FROM searches
WHERE user_id = $1
RETURNING *;