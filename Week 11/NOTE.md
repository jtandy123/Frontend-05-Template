学习笔记

CSS规则分为：
* 普通规则
* @规则

CSS2.1总体结构
* @charset
* @import
* rules
    * @media
    * @page
    * rule

@规则：
* @charset - https://www.w3.org/TR/css-syntax-3/ - 字符集
* @import - https://www.w3.org/TR/css-cascade-4/ 
* @media - https://www.w3.org/TR/css3-conditional/ - 媒体查询
* @page - https://www.w3.org/TR/css-page-3/ - 分页媒体，主要的分页媒体就是打印机，一般来说浏览器是不分页的
* @counter-style - https://www.w3.org/TR/css-counter-styles-3/ - 列表前面的小黑点、小数字
* @keyframes - https://www.w3.org/TR/css-animations-1/ - 动画
* @fontface - https://www.w3.org/TR/css-fonts-3/ - web font，icon-font
* @supports - https://www.w3.org/TR/css3-conditional/ - 检查CSS的某些功能是否存在
* @namespace - https://www.w3.org/TR/css-namespaces-3/ - 命名空间，对应HTML的命名空间，完备性考量

历史上存在过的@rules
* @document
* @color-profile SVG1.0，浏览器已不支持
* @font-feature

CSS规则
* Selector
    * https://www.w3.org/TR/selectors-3/ 
    * https://www.w3.org/TR/selectors-4/ 
* Key
    * Properties
    * Variables: https://www.w3.org/TR/css-variables/ 
* Value
    * https://www.w3.org/TR/css-values-4/ 

CSS架构
* @rule
    * @charset
    * @import
    * @media
    * @page
    * @counter-style
    * @keyframes
    * @fontface
    * @support
    * @namespace
* rule
    * Selector
        * selector_group
        * selector
            * &gt;
            * &lt;sp&gt;
            * \+
            * ~
        * simple_selector
            * type
            * \*
            * \#
            * .
            * [ ]
            * :
            * ::
            * :not()
    * Declaration
        * Key
            * variables
            * properties
        * Value
            * calc
            * number
            * length
            * ......

```js
Array.prototype.slice.call(document.querySelector('#container').children)
.filter(e => e.getAttribute('data-tag').match(/css/))
.map(e => ({name: e.children[1].innerText, url: e.children[1].children[0].href}));
```

CSS总论 - 总结
* CSS语法
* @rule
* selector
* variables
* value
* 实验 - 去W3C网站爬取一些CSS的内容

CSS选择器
选择器语法
* 简单选择器
    * \*
    * div svg|a - 类型选择器
        * HTML的命名空间主要有3个：HTML、SVG、MathML
        * 单竖线是CSS中命名空间分隔符。在HTML里面命名空间分隔符是:
        * 需要配合@namespace使用
        * HTML与SVG重叠的元素名就一个a，MathML和HTML没有重叠
    * .cls
    * #id
    * [attr=value]、[attr|=value]、[attr~=value]、[attr*=value]、[attr^=value]、[attr$=value]：如果不考虑优先级，理论上可以代替class和id选择器
    * :hover
    * ::before
* 复合选择器
    * <简单选择器><简单选择器><简单选择器>
    * *或者div必须写在最前面。伪类伪元素要写在最后面
* 复杂选择器
    * <复合选择器>\<sp><复合选择器>
    * <复合选择器> “>" <复合选择器>
    * <复合选择器> “~” <复合选择器>
    * <复合选择器> “+” <复合选择器>
    * <复合选择器> “||” <复合选择器>

CSS选择器优先级
* 简单选择器计数
    * 采用一个N进制数值来表示specificity，例如[0, 2, 1, 1]，S=0 * (N^3) + 2 * (N^2) + 1 * (N^1) + 1
    * IE老版本为了节省内存，N取值255，导致256个class等于1个id的bug
    * N的取值大部分浏览器都选择了65536，16进制的倍数，256的整次幂
伪类选择器（如:hover）和属性选择器（如[type="input"]）与一个类选择器的优先级相同。通用选择器（*）和组合器（>、+、~）对优先级没有影响。   

#a:not(#b)        0 2 0 0   
div#a.b .c[id=x]  0 1 3 1   
div.a             0 0 1 1  
*.a               0 0 1 0   

CSS伪类选择器
* 链接/行为
    * :any-link
    * :link :visited
        * 使用了link和visited之后，无法修改元素除文字颜色之外的属性 ： 安全问题考虑，可以知道用户访问过哪些网站
    * :hover
    * :active
    * :focus
    * :target - 给作为锚点的a标签使用
* 树结构
    * :empty
    * :nth-child()
    * :nth-last-child()
    * :first-child :last-child :only-child
* 逻辑型
    * :not伪类，只支持简单选择器和复合选择器
    * :where :has，level 4加入的

CSS选择器伪元素
* ::before，可以设置content属性，无中生有
* ::after，可以设置content属性，无中生有
* ::first-line，排版后的第一行，包裹
    * font系列
    * color系列
    * background系列
    * word-spacing
    * letter-spacing
    * text-decoration
    * text-transform
    * line-height
* ::first-letter，包裹
    * font系列
    * color系列
    * background系列
    * text-decoration
    * text-transform
    * letter-spacing
    * word-spacing
    * line-height
    * float
    * vertical-align
    * 盒模型系列：margin, padding, border
