SELECT * 
FROM
(
  SELECT array_agg(tag_text) AS tag_arr, tags.meme_id AS match_id
  FROM tags
  GROUP BY match_id
) tag_arr
  FULL JOIN 
(
  SELECT * 
  FROM memes
) meme_table
  ON tag_arr.match_id = meme_table.meme_id
  WHERE featured = 1
  ORDER BY id DESC
  LIMIT $1;