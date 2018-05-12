SELECT COUNT(date), tag_text
FROM tags
WHERE date >= $1
GROUP BY tag_text
ORDER BY COUNT(date) DESC
LIMIT 14;