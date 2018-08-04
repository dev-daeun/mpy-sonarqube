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
    project: {
        findAll: sql('project/findAll.sql'),
        findOne: sql('project/findOne.sql')
    },
    user: {
        find: sql('user/find.sql'),
        create: sql('user/create.sql')
    },
    usertoken: {
        find: sql('usertoken/find.sql'),
        create: sql('usertoken/create.sql'),
    },
    organization: {
        find: sql('organization/find.sql'),
        create: sql('organization/create.sql')
    },
    orgUser: {
        create: sql('orgUser/create.sql')
    }
};