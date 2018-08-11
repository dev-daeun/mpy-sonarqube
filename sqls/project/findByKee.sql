SELECT projects.*,
       issues.Id,
       issues.line,
       issues.message,
       issues.severity
FROM projects
JOIN issues
ON issues.project_uuid = projects.project_uuid
WHERE projects.${column:raw} LIKE CONCAT(${value}, '%')