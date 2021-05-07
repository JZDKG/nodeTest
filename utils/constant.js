const { env } = require('./env')
const UPLOAD_PATH = env === 'dev' ? '/Users/tankui/Downloads': '/root/upload'

module.exports = {
    CODE_ERROR: -1,
    CODE_SUCCESS: 200,
    CODE_TOKEN_EXPIRED: -2,
    debug: true,
    PWD_SALT: 'admin_imooc_node',
    PRIVATE_KEY: 'admin_imooc_node_test_youbaobao_xyz',
    JWT_EXPIRES: 60 * 60,
    UPLOAD_PATH
}
