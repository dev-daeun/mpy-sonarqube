INSERT INTO active_rules
            (
                        profile_id,
                        rule_id,
                        failure_level,
                        created_at,
                        updated_at
            )
            VALUES
            (
                        ${profileId},
                        ${ruleId},
                        ${failureLevel},
                        ${createdAt},
                        ${updatedAt}
            )
RETURNING Id