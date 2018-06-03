SELECT memes.*, users.username 
FROM memes
JOIN users ON users.id = memes.user_id
WHERE memes.id = $1;

