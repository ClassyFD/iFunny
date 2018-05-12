SELECT id, prev_id, next_id
FROM (
  SELECT id,
    lag(id) over (order by id) as prev_id,
    lead(id) over (order by id) as next_id
  FROM memes
) as t
where id = $1;