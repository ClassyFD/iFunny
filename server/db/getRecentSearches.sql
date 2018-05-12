SELECT searches.search AS tag_text, searches.type, searches.date
FROM searches
WHERE user_id = $1
GROUP BY date, type, search
ORDER BY date DESC;