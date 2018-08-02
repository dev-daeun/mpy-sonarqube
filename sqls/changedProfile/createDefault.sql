
CREATE extension IF NOT EXISTS "uuid-ossp";
INSERT INTO qprofile_changes
            (
                        rules_profile_uuid,
                        created_at,
                        kee,
                        change_type,
                        change_data
            )
SELECT ${ruleProfileUid} AS rules_profile_uuid,
       ${date} as created_at,
       *
FROM
       (
              SELECT Uuid_generate_v4() AS kee,
                     change_type,
                     change_data
              FROM   qprofile_changes
              WHERE  rules_profile_uuid =
                     (
                            SELECT kee
                            FROM   rules_profiles
                            WHERE  NAME = 'Sonar way'
                            AND    language = ${language})) AS builtIn

RETURNING kee