SELECT issues.Id,
	   projects.name,
       projects.long_name,
       issues.line,
       issues.message,
       issues.severity
FROM   issues
       JOIN projects
         ON issues.component_uuid = projects.uuid
WHERE  issues.project_uuid = ${projectUid}
ORDER BY issues.Id DESC