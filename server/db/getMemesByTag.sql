SELECT * 
FROM
(
  SELECT array_agg(tag_text) AS collective_tag_arr, tags.meme_id AS match_id
  FROM tags
  WHERE tag_text = $1
  GROUP BY match_id
) tag_arr
  JOIN 
(
  SELECT memes.*, array_agg(tags.tag_text) AS tag_arr
  FROM memes
  JOIN tags on tags.meme_id = memes.meme_id
  GROUP BY memes.id
) meme_table
  ON tag_arr.match_id = meme_table.meme_id
  ORDER BY id DESC
  LIMIT $2;
