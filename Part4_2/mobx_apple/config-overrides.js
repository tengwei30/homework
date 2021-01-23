// 配置 支持修饰器语法

const { override, addDecoratorsLegacy } = require('customize-cra');
module.exports = override(addDecoratorsLegacy());