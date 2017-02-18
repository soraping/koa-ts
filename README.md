## koa+typescript

> * 框架: koa+tyescript
> * db: mongodb
> * 编辑器: vscode
> * 测试: mocha
> * 项目地址: https://github.com/soraping/koa-ts.git

### 项目下载安装模块
``` bash
    git clone https://github.com/soraping/koa-ts.git
    cd koa-ts
    npm install
```

### vscode debug配置
在.vscode文件夹中，修改launch.json文件
``` JavaScript
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
            "outDir": "${workspaceRoot}/build",
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
注意，在属性'runtimeExecutable'处我选用nodemon检测ts编译后的js文件，‘restart’属性选择true
根目录下nodemon.json文件就是nodemon的配置文件，要配置所要检测的文件夹，否则会默认检测这个项目，影响性能

### tsconfig.json文件文件配置
``` JavaScript
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

### 启动
首先要确认mongodb是开启状态
``` bash
    npm run build  # 启动tsc编译监控
```
点击vscode默认debug键, enjoy!