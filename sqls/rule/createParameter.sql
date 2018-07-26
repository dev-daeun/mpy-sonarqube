INSERT INTO rules_parameters
            (
                        rule_id,
                        name,
                        param_type,
                        default_value
            )
            VALUES ${formatted}
RETURNING Id