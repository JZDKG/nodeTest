const { querySql, queryOne, insertSql } = require('../db')

function login(username, password) {
    return querySql(`select * from admin_user where username='${ username }' and password = '${ password }'`)
}

function findUser(username) {
    return queryOne(`select id, username, nickname, role, avatar from admin_user where username='${ username }'`)
}

function register(username, password) {
    return insertSql(`INSERT INTO test_user VALUES (null, '${ username }', '${ password }')`)
}

module.exports = {
    login,
    findUser,
    register
}
