学习笔记

前端架构最热门的两个话题：
* 组件化：主要目标就是复用
* 架构模式：MVC、MVVM等等，主要关心前端跟数据逻辑层之间是如何去交互的

组件基本组成部分
* 组件区别于模块、对象
* 一般认为组件是跟UI强相关的东西，某种意义上可以认为它是一种特殊的模块或者特殊的对象
* 既是模块又是对象，它可以以树形结构来进行组合并且有一定的模板化的配置的能力

对象
* Properties
* Methods
* Inherit
在JavaScript里面，普通对象的属性和方法是一体的，然后加上继承关系，JavaScript里面是运行时，它默认采用的是原型继承  
组件里面包含的语义要素更丰富一些  

组件
* Properties
* Methods
* Inherit
* Attribute
* Config & State - 配置：构造函数传的参数；状态：随着人的操作或一些方法的调用而发生变化
* Event - 组件往外传递东西
* Lifecycle
* Children - 树形结构的必要性，形不成树形结构，描述界面的能力就会弱很多
一些拖拽的系统可以在界面上把组件一个一个拖过去，但是因为互相之间没有树形结构，所以这种基于拖拽的UI流行一段时间，大家发现简单用非常好使，一旦复杂了，对界面的语义要求高了，又要有一些自动排版的东西，拖拽的形式，大家发现不够用  

组件在对象的基础上增加了一些语义的相关的概念，使得组件非常适合用来描述UI   
![component](https://github.com/jtandy123/Frontend-05-Template/blob/master/Week%2014/component.png)

Attribute
* Attribute vs Property
* Attribute强调描述性 - 例如人很帅，头发很多，皮肤是黄色
* Property强调从属关系  

property - 面向对象的里面的property的概念  
attribute - XML里面的attribute的概念  

HTML是典型的property和attribute两者不等效的一个系统  
```html
<div class=“cls1 cls2”></div>
<script>
var div = document.getElementByTagName(‘div’);
div.className // cls1 cls2
```
目前JS中已经支持div.class的写法，但是HTML中还是不支持
```html
<div class=“cls1 cls2” style=“color:blue;"></div>
<script>
var div = document.getElementByTagName(‘div’);
div.style // 对象
```
attribute是字符串，property是对象
```html
<a href=“//www.example.com”></a>
<script>
var a = document.getElementByTagName(‘a’);
a.href // “http://www.example.com”，这个URL是resolve过的结果
a.getAttribute(‘href’); // “//www.example.com”，跟HTML代码中完全一致
```
```html
<input value=“cute” />
<script>
var input = document.getElementByTagName(‘input’);
input.value // 若property没有设置，则结果是attribute，cute
input.getAttribute(‘value’); // cute
input.value = ‘hello’; // 若value属性已经设置，则attribute不变，property变化，元素上实际的效果是property优先
input.value // hello
input.getAttribute(‘value’); // cute
```
如何设计组价状态？
property
* markup set ❌
* JS set ✅
* JS change ✅
* User Input Change ❓
attribute
* markup set ✅
* JS set ✅
* JS change ✅
* User Input Change ❓
state
* markup set ❌
* JS set ❌
* JS change ❌
* User Input Change ✅
config
* markup set ❌
* JS set ✅
* JS change ❌
* User Input Change ❌

Lifecycle
* created
    * mount
        * mount
            * unmount
                * created
                * destroyed
    * JS change/set
        * render/update
            * created
            * destroyed
    * User Input
        * render/update
            * created
            * destroyed

Children - 构建组件树   
* Content型Children与Template型Children
```html
<my-button><img src=“{{icon}}” />{{title}}</my-button>

<my-list>
  <li><img src=“{{icon}}” />{{title}}</li>
</my-list>
```
Content型Children：有几个children就能显示出几个children  
Template型Children：整个Children充当模板的作用，例如list，children无法反映出实际渲染出来的组件的数目  

组件系统首先是一个由Markup和JavaScript代码两者都可以访问的环境  

Markup的建立的风格
* 和React一样的JSX
* 基于类似于Vue的标记语言的parser

JSX
* 纯粹的语言的扩展，可以被其他的组件体系去使用的
* 甚至可以把它单纯地作为一种创建HTML标签的快捷方式去使用

JSX环境搭建
* npm init -y
* npm install -D webpack // webpack-cli可以全局安装
* npm install -D babel-loader
* npm install -D @babel/core @babel/preset-env
* 创建webpack.config.js并配置
* npm install -D @babel/plugin-transform-react-jsx
