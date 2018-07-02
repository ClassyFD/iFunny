SELECT search AS tag_text, MAX(date) AS date, MAX(type) AS type
FROM searches
WHERE user_id = 2
GROUP BY search
ORDER BY MAX(date) DESC
LIMIT 10;