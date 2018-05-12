SELECT lower(username) FROM users
WHERE lower(username) = $1;