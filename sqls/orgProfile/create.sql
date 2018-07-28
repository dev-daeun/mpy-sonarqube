INSERT INTO org_qprofiles
            (
                        uuid,
                        organization_uuid,
                        rules_profile_uuid,
                        created_at,
                        updated_at
            )
VALUES ${formatted}
RETURNING uuid