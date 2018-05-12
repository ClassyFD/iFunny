SELECT tags.tag_text, array_agg(memes.picture) AS pictures
FROM tags
JOIN memes ON tags.meme_id = memes.meme_id
WHERE date >= $1
GROUP BY tag_text
ORDER BY count(tags.date) desc
LIMIT 14;