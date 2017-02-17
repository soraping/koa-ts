#koa-typescript

### 开发工具
vscode

### 环境要求
```
node 6.3.1
typescript 2.0.10
```

### 环境搭建
1. 用vscode打开工程，npm安装koa家族 

	```
		npm install koa ******** --save
	```

2. 安装ts模块文件 (见必要说明)

	```
		npm install --save-dev @types/koa *********
	```

3. 编写ts入口文件=>index.ts
	
	```
		'use strict';
		import * as Koa from 'koa';
		import * as convert from 'koa-convert';
		import * as BodyParser from 'koa-bodyparser';
		import * as Json from 'koa-json';
		import * as Logger from 'koa-logger';

		const app = new Koa();

		app.use(convert(Json()));
		app.use(convert(BodyParser()));
		app.use(convert(Logger()));
		
		app.use(async (ctx:Koa.Context, next: any) => {
			ctx.body = "hello world";
		});

		app.listen('3001',()=>{
			console.log('3001端口');
		});

	```
	这个是入口文件，ts编译时指向的就是这个文件,注意，这个文件的后缀是.ts，不是.js。
	（es6的写法，告别babel，ts赛高!）


4. 配置tsconfig.json启动参数

	```
		{
		    "compileOnSave": false,
		    "compilerOptions": {
		    	//模块引入方式
		        "module": "commonjs",
		        "target": "ES6",
		        "noImplicitAny": true,
		        "sourceMap": true,
		        "preserveConstEnums": true,
		        "emitDecoratorMetadata": true,
		        "removeComments": true,
		        //项目目录
		        "rootDir": "./src",
		        //编译后的js文件目录
		        "outDir": "./build",
		        "experimentalDecorators": true
		    },
		    //编辑器
		    "atom": {
		        "rewriteTsconfig": true
		    },
		    //不需要监控编译的目录
		    "exclude": [
		        "node_modules",
		        "build"
		    ],
		    //需要ts编译的文件集合
		    "include": [
		        "./src/typdts/*/*.d.ts"
		    ],
		    //需要ts编译的文件绝对路径
		    "files": [
		        "./src/index.ts"
		    ],
		    "filesGlob": [
		        "./src/**/*.ts"
		    ]
		}
	```

	这个文件是ts编译时的配置参数，具体内容可以查看文档，其中最重要的就是sourceMap参数一定要设置为true。

5. vscode debug配置文件
	vscode开启项目debug模式会生成launch.json文件
	
	```
	{
	    "version": "0.2.0",
	    "configurations": [
	        {
	            "name": "ts node debug",
	            "type": "node",
	            "request": "launch",
	            //debug指向文件，其实真正运行的是编译后的文件
	            "program": "${workspaceRoot}/src/index.ts",
	            "stopOnEntry": false,
	            "args": [],
	            "cwd": "${workspaceRoot}",
	            "outDir": "${workspaceRoot}/build",
	            "runtimeExecutable": null,
	            "runtimeArgs": [
	                "--nolazy"
	            ],
	            "env": {
	                "NODE_ENV": "development"
	            },
	            "externalConsole": false,
	            //一定要开启
	            "sourceMaps": true
	        },
	        {
	            "type": "node",
	            "request": "attach",
	            "name": "附加到进程",
	            "port": 5858,
	            "outFiles": [],
	            "sourceMaps": true
	        }
	    ]
	}
	```

6. 开始编译
	
	```
		ts --watch
	```
	--watch 监控ts文件修改再次编译
	会发现error，暂时不管，打开编译后的文件:

	使用node运行一下，发现可以运行，那为什么会报错，参照必要说明。
	运行是没有问题的,如果要看看断点调试，那么就要在代码中添加一些测试代码了。

### 调试测试

### 必要说明
typescript在2.0后就不需要使用typings去配置d.ts文件了，可以直接使用npm去管理!
例如package中已经安装了koa，那么，ts需要解释这个库就必须引入到koa.d.ts文件，那么我们就使用npm来安装这个库:

```
npm install @types/koa --save-dev
```
在node_modules中查看这个库：

其中*.d.ts文件是在编译时让ts找到相应的模块，如果没有这些文件，ts在编译时会报找不到相应模块的异常，但这些异常不会阻断编译，而且在项目启动时也不会报错，ts不认识模块，但js认得，毕竟node跑的脚本是js
当然，常用的一些库在npm上都已经有了d.ts文件，没有的也可以自己去写。