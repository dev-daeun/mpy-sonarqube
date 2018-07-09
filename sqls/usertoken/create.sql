INSERT INTO user_tokens(
    login,
    name,
    token_hash,
    created_at
)
VALUES (
    ${login},
    ${name},
    ${hashed},
    ${date}
)