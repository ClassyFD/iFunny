SELECT
    json_build_object(
        'user',users.*,
        'memes',(
            SELECT json_agg(json_build_object(
                'id', memes.id,
                'picture', memes.picture,
                'likes', memes.likes,
                'comments', memes.comments,
                'caption', memes.caption,
                'tags', (
                    SELECT json_agg(json_build_object(
                        'id', tags.id,
                        'tag_text', tags.tag_text
                    ))
                    FROM tags
                    WHERE memes.meme_id = tags.meme_id
                )
            ))
            FROM memes 
            WHERE memes.user_id = users.id
            ORDER BY sum(memes.id) DESC
        )
    )
FROM users
WHERE users.id = $1;