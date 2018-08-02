SELECT change_type,
       change_data
FROM   qprofile_changes
WHERE  rules_profile_uuid = (SELECT kee
                             FROM   rules_profiles
                             WHERE  NAME = ${name}
                                    AND language = ${language})