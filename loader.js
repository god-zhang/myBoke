const fs = require('fs');
const globalConfig = require('./config');

const files = fs.readdirSync(__dirname + globalConfig['web_path']);
const allMap = new Map();


for (let i = 0; i < files.length; i++) {
    const temp = require('./' + globalConfig['web_path'] + '/' + files[i]);
    if (temp.apiMap) {
        for (const [k, v] of temp.apiMap) {
            if (allMap.get(k) == null) {
                allMap.set(k, v);
            } else {
                throw new Error('请求url异常:' + k);
            }
        }
        // controllerArr.push(temp);
    }
}
// console.log(controllerArr);
module.exports = allMap;