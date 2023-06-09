const fs = require("fs");
const path = require("path");


module.exports = function (root, app) {
    // /api
    const dir = fs.readdirSync(path.join(__dirname, root), {
        withFileTypes: true, // withFileTypes: 파일이 fs.Dirent 객체로 반환되는지 여부를 지정하는 부울 값입니다. 기본값은 '거짓'입니다.
    });
    dir.forEach((p) => {
        if (p.isDirectory()) {
            if (p.name != "_controller") {
                arguments.callee(`${root}/${p.name}`, app); //재귀함수 /api/todo, app
            }
        } else {
            let moduleName = '/'+ p.name.replace(/\.js/g, "");
            if(moduleName == '/index'){
                moduleName="";
            }
            app.use(`${root}${moduleName}`, require(`.${root}/${p.name}`));
        }
    });
};