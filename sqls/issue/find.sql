CREATE OR REPLACE VIEW v_org_id
AS
  SELECT organization_uuid
  FROM   organization_members
  WHERE  user_id = (SELECT users.id
                    FROM   user_tokens
                           JOIN users
                             ON user_tokens.login = users.login
                    WHERE  users.login = ${login});


SELECT issues.Id,
	   projects.name,
       projects.long_name,
       issues.line,
       issues.message,
       issues.severity
FROM   issues
       JOIN projects
         ON issues.component_uuid = projects.uuid
WHERE  projects.organization_uuid = (SELECT *
                                     FROM   v_org_id)
       AND projects.kee LIKE CONCAT(${projectKee}, ':%')
ORDER BY issues.Id DESC