SELECT search AS tag_text, MAX(date) AS date, MAX(type) AS type, MAX(owner_id) as user_id
FROM searches
WHERE user_id = $1
GROUP BY search
ORDER BY MAX(date) DESC
LIMIT 10;