SELECT rules_profiles.*
FROM   rules_profiles
       JOIN org_qprofiles
         ON org_qprofiles.rules_profile_uuid = rules_profiles.kee
WHERE  org_qprofiles.organization_uuid = (SELECT uuid
                                          FROM   organizations
                                          WHERE  name = ${name} AND language = ${language})