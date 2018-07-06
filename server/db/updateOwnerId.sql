UPDATE searches
SET owner_id = $2
WHERE search = $1
RETURNING id;