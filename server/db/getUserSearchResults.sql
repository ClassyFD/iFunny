SELECT *
FROM users 
WHERE lower(username) LIKE '%' || lower($1) || '%'
GROUP BY id
ORDER BY username ASC
LIMIT 10;