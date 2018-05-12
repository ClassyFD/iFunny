INSERT INTO users (email, picture, subscriptions, memes, likes, comments, username, headline, user_id, name)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
RETURNING *;