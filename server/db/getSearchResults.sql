SELECT count(*), tags.tag_text
FROM tags
WHERE lower(tag_text) LIKE '%' || lower($1) || '%'
GROUP BY tag_text
ORDER BY COUNT DESC
LIMIT 10;