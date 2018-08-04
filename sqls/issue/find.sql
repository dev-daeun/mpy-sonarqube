SELECT issues.Id,
	   projects.name,
       projects.long_name,
       issues.line,
       issues.message,
       issues.severity
FROM   issues
       JOIN projects
         ON issues.component_uuid = projects.uuid
WHERE  projects.kee LIKE CONCAT(${projectKee}, ':%')
ORDER BY issues.Id DESC