UPDATE users
SET username = $1
WHERE id = $2;
SELECT * FROM users 
WHERE id = $2;