学习笔记

脚手架 — generator   
yeomaon-generator   
generator的generator   
* 初始化项目，项目name必须以generator-开头
* 创建模板

```
$ npm init -y
$ npm install yeoman-generator
```

* package.json
* generators
    * app
        * templates
        * index.js

```
$ npm link
$ yo <generator-name>
```

* user interactions
    * this.prompt([...])
* interacting with the file system
    * creating a template with parameter placeholder
    * copying the template
        * this.fs.copyTpl(template, destination, options)
* managing dependencies
    * extend or create package.json file in destination path
        * this.fs.extendJSON(this.destinationPath(‘package.json’), pkgJson)
    * npm install
        * this.npmInstall([…], {’save-dev’: true | false})

webpack — 最初为Node设计的打包工具   
把一个node代码打包为浏览器可用的代码，最初设计就是完全针对JS的一个系统   

一定要最后打包出来一个JS文件，然后再拿html手工地去引这个JS文件   

多文件合并   
在合并的过程中，它可以通过各种各样的loader和plugin去控制一些合并的规则和对文本进行一些转换   
loader — webpack的灵魂   
loader的使用就是把一个source变成一个目标代码   

babel — 把新版本的JS编译成一个老版本的JS的版本   

@babel/core   
@babel/cli   
@babel/preset-env   
babel-loader   
