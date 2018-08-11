SELECT issues.Id,
	   projects.name,
       projects.long_name,
       issues.line,
       issues.message,
       issues.severity
FROM   issues
       RIGHT OUTER JOIN projects
         ON issues.component_uuid = projects.uuid
WHERE  projects.project_uuid = ${projectUid}
ORDER BY issues.Id DESC