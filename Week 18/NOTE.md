学习笔记
测试工具   
对于大部分开源项目来说，测试都是一个必需品  
公司的商业项目里面，如果组件或者库是一个被高度复用的东西，那测试的收益也是非常高的  
如果写的不是一次性的业务代码，应该尽量使用单元测试   

最流行的两个前端测试库：
* Mocha
* Jest

其实没有什么本质区别，测试框架大同小异，最重要的不是测试框架，而是跟coverage相关的工具   

Mocha最初是针对Node.js的框架   
Node.js中不支持import和export：  
* package.json中加type: “module”，此方式问题可能较多，较少使用
* 引入babel

Mocha单元测试：
* 方式一：先webpack，然后dist里面的去做单元测试。依赖build
* 方式二：babel register
    * 安装@babel/core、@babel/register
```
$ ./node_modules/.bin/mocha --require @babel/register

// package.json
scripts: {
  "test": "mocha --require @babel/register"
}

$ npm run test
```
   
单元测试里面一个非常重要的指标：code coverage
Mocha里面没有code coverage，必须得配合一些其他的工具

写了test case，但是并不知道test case写的好不好，也不知道有没有测全被测功能的所有情况   
code coverage：指测试到底覆盖了源文件里面的哪些代码   

nyc相关配置：
```
{
  "name": "demo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "mocha --require @babel/register",
    "coverage": "nyc mocha"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@babel/core": "^7.12.10",
    "@babel/preset-env": "^7.12.11",
    "@babel/register": "^7.12.10",
    "@istanbuljs/nyc-config-babel": "^3.0.0",
    "babel-plugin-istanbul": "^6.0.0",
    "mocha": "^8.2.1",
    "nyc": "^15.1.0"
  }
}

```

.babelrc
```
{
  "presets": ["@babel/preset-env"],
  "plugins": ["istanbul"],
  "sourceMaps": "inline"
}
```

.nycrc
```
{
  "extends": "@istanbuljs/nyc-config-babel"
}
```


工具链：
- yeoman-generator
- webpack
- babel
- mocha & nyc

开发常用scripts命令：
- dev
- test
- coverage
- build
- publish
- doc
