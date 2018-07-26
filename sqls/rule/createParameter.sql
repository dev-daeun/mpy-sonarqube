INSERT INTO rules_parameters
            (
                        rule_id,
                        name,
                        param_type,
                        default_value
            )
            VALUES
            (
                        ${ruleId},
                        ${name},
                        ${paramType},
                        ${defaultValue}
            )
RETURNING Id