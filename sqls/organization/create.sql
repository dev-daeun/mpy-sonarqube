INSERT INTO organizations
            (uuid,
             kee,
             name,
             created_at,
             updated_at,
             guarded,
             new_project_private)
VALUES      (${uuid},
             ${kee},
             ${name},
             ${createdAt},
             ${updatedAt},
             true,
             false)