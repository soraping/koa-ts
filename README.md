## koa+typescript

> * 框架: koa+tyescript
> * db: mongodb
> * 编辑器: vscode
> * 测试: mocha
> * 项目地址: https://github.com/soraping/koa-ts.git

[移步 lenneth](https://github.com/soraping/lenneth)

### 项目下载安装模块

```bash
    git clone https://github.com/soraping/koa-ts.git
    cd koa-ts
    npm install
```

### vscode debug 配置

在.vscode 文件夹中，修改 launch.json 文件

```JavaScript
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "koa2",
            "type": "node",
            "request": "launch",
            "program": "${workspaceRoot}/src/index.ts",
            "stopOnEntry": false,
            "args": [],
            "cwd": "${workspaceRoot}",
            "outFiles": ["${workspaceRoot}/build/**/*.js"],
            "runtimeExecutable": "nodemon",
            "runtimeArgs": [
                "--nolazy"
            ],
            "env": {
                "NODE_ENV": "development"
            },
            "externalConsole": false,
            "sourceMaps": true,
            "restart": true
        }
    ]
}
```

注意，在属性'runtimeExecutable'处我选用 nodemon 检测 ts 编译后的 js 文件，‘restart’属性选择 true
根目录下 nodemon.json 文件就是 nodemon 的配置文件，要配置所要检测的文件夹，否则会默认检测这个项目，影响性能

### tsconfig.json 文件文件配置

```JavaScript
{
    "compileOnSave": false,
    "compilerOptions": {
        "module": "commonjs",       // 模块引入方式
        "target": "ES6",            // 将ts文件转成es6的js代码
        // 当 noImplicitAny 标志为 true 的时候，TypeScript 编译器不能推断类型，它仍然生成 JavaScript 文件，但是报告一个错误。
        "noImplicitAny": true,
        "sourceMap": true,          // 开启sourceMap
        "preserveConstEnums": true,
        "emitDecoratorMetadata": true,   // 开启修饰器
        "experimentalDecorators": true,  // 开启修饰器
        "removeComments": true,
        "rootDir": "./src",   // tsc目标文件夹
        "outDir": "./build"   // tsc输出文件夹
    },
    // atom
    "atom": {
        "rewriteTsconfig": true
    },
    // 不需要监控编译的目录
    "exclude": [
        "node_modules",
        "build"
    ],
    // 需要ts编译的文件集合
    "include": [
        "./src/typdts/*/*.d.ts",
        "./src/apis/*.ts"
    ],
    // 需要ts编译的文件绝对路径
    "files": [
        "./src/index.ts"
    ],
    "filesGlob": [
        "./src/**/*.ts"
    ]
}
```

### 项目配置文件

```JavaScript
// config.json
{
    "port": "8083",          // 端口
    "log": {
        "log_name": "log",   // 日志名称
        "log_path": "logs/"  // 日志路径
    },
    "mongo": {
        "development": {
            "host": "mongodb://localhost:27017/ts-test"
        },
        "production": {
            "host": ""
        }
    },
    "session": {
        "secrets": "koa-ts"
    },
    "jwt": {
        "secret": "koa-ts-jwt"
    }
}
```

### 开发

参照了网上的一些案例，进行了整理，利用 es7 的 Decorator 把 koa-router 做了一些封装

```JavaScript
import {router, required, prefix, convert, log} from '../middleware/router';
// api path
@prefix('/user')
class UserController{

    // 访问路径就是/user/findOne/zhangsan
    @router({
        method: 'get',
        path: '/findOne/:username',
        unless: true   //如果不做jwt校验，则把这个字段置为true，默认校验
    })
    // 必传参数 {params: ...,query:...}
    @required({params: 'username'})
    // 中间件，api执行前会调用someFun方法
    @convert(someFun)
    // 日志
    @log
    async getUserOne (ctx: IRouterContext): Promise<void> {
        let user = await UserModel.findOne({username: ctx.params.username});
        ctx.body = user;
    }
}
```

设计 api 时可以按照上述写法，这样写就更加的优雅

### 启动

首先要确认 mongodb 是开启状态

```bash
npm run build  # 启动tsc编译监控
```

点击 vscode 默认 debug 键, enjoy!
