INSERT INTO comments_table (replies, likes, user_id, meme_id, reply_id, date, comment)
VALUES (0, 0, $1, $2, null, $3, $4)
RETURNING *;
