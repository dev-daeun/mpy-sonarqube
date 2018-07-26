const QueryFile = require('pg-promise').QueryFile;
const path = require('path');

// Helper for linking to external query files:
function sql(file) {

    const fullPath = path.join(__dirname, '/', file); // generating full path;
    return new QueryFile(fullPath, {minify: true});
}

module.exports = {
    issue: {
        find: sql('issue/find.sql')
    },
    user: {
        find: sql('user/find.sql'),
        create: sql('user/create.sql')
    },
    organization: {
        find: sql('organization/find.sql'),
        create: sql('organization/create.sql')
    },
    usertoken: {
        find: sql('usertoken/find.sql'),
        create: sql('usertoken/create.sql'),
    },
    rule: {
        create: sql('rule/create.sql'),
        createProfile: sql('rule/createProfile.sql'),
        createActive: sql('rule/createActive.sql'),
        createParameter: sql('rule/createParameter.sql')
    }

};