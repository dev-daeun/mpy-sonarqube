INSERT INTO rules_profiles
            (
                        NAME,
                        language,
                        kee,
                        rules_updated_at,
                        created_at,
                        updated_at,
                        is_built_in
            )
            VALUES ${formatted}

RETURNING Id, language, kee