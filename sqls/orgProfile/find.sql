SELECT *
FROM   org_qprofiles
WHERE  organization_uuid = (
              SELECT uuid
              FROM   organizations
              WHERE  name = ${name}
       )