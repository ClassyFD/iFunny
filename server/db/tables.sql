-- USER TABLE
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email TEXT,
  picture TEXT,
  subscriptions INT,
  memes INT,
  likes INT,
  comments INT,
  username TEXT,
  headline TEXT,
  user_id TEXT,
  name TEXT
);

-- SUBSCRIPTIONS TABLE
CREATE TABLE subscriptions (
  id SERIAL PRIMARY KEY,
  date_subscribed TEXT,
  user_id INT REFERENCES users(id),
  subscription_id INT REFERENCES users(id)
);

-- MEMES TABLE
CREATE TABLE memes (
  id SERIAL PRIMARY KEY,
  picture TEXT,
  likes INT,
  comments INT,
  tags INT
);

-- TAGS TABLE
CREATE TABLE tags (
  id SERIAL PRIMARY KEY,
  tag_text TEXT,
  meme_id INT REFERENCES memes(id)
);

-- LIKES TABLE 
CREATE TABLE likes (
  id SERIAL PRIMARY KEY,
  time_liked TEXT,
  user_id INT REFERENCES users(id),
  meme_id INT REFERENCES memes(id)
);

-- DISLIKES TABLE
CREATE TABLE dislikes (
  id SERIAL PRIMARY KEY,
  time_disliked TEXT,
  user_id INT REFERENCES users(id),
  meme_id INT REFERENCES memes(id)
);

-- COMMENTS TABLE
CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  time_commented TEXT,
  replies INT,
  likes INT,
  dislikes INT,
  user_id INT REFERENCES users(id),
  meme_id INT REFERENCES memes(id),
  reply_id INT REFERENCES comments(id)
);
