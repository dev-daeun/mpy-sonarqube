SELECT *
FROM projects
WHERE ${column:raw} = ${value}
AND path IS NULL