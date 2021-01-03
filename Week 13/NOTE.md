学习笔记

JS语言: 语法，语义，运行时  
HTML的定义：XML与SGML  

SGML上世纪60年代末产生的，最早IBM使用的数据描述语言  
XML是SGML的比较流行的一个子集，加入了其他的规定和改良  
HTML最早也是按照SGML的一个子集方式来定义，有符合SGML定义的DTD  
XHTML，W3C对HTML做了XML化的尝试  
XHTML2 过于严苛的规定导致社区不接受，流产，没有被大规模使用  
HTML5 重新定义了HTML与XML、SGML这两种语言的关系，不再认为自己是SGML的一个子集  

DTD与XML namespace  
* http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd
* http://www.w3.org/1999/xhtml

XHTML1.0对应HTML4.2版本左右  

HTML实体  
nbsp: no-break space = non-breaking space  
两个单词用nbsp连接，会让它们在语义上变成一个单词  
如果想要出现多个空格，推荐使用CSS中的white-space属性去控制空格显示出来，不推荐使用nbsp，会破坏语义  

quot  双引号  
amp  &  
lt  <  
gt  >  
apos 单引号  

namespace的URL代表了唯一的一种语言  
HTML常用namespace：XHTML，MathML，SVG  

HTML标签语义  
div+span  or 尽可能使用语义化标签  

aside 非主体部分  
main 主体部分  
article 文章主体内容  
hgroup 标题组  
h1 主标题  
h2 副标题  
hr 改变故事走向，切换话题的场景  
abbr 缩写  
p段落, 没有合适的标签来处理某个语义的时候，可以使用class来作为补充  
strong 重要性  
em 辅助语气表示，重音  

img 图片  
figure 图片组  
figcaption  
ol  有序列表  
li  列表  
nav 导航  
dfn 表示定义  
code  
pre  
samp  
footer  

HTML语法  
合法元素  
* Element: \<tagname>…\</tagname>
* Text: text
* Comment: \<!-- comments -->
* DocumentType: \<!DOCTYPE html>
* ProcessingInstruction: \<?a 1?>  预处理语法，很多预处理都是自己发明的语法去处理的
* CDATA: \<![CDATA[ ]]> 特殊的语法，文本的另一种语法的表达，不需要考虑转义问题，从XML继承来的信息

字符引用  
* \&#161;
* \&amp;
* \&lt;
* \&quot;

浏览器API  
* DOM API，70%-80%
    * traversal系列的API，可以访问DOM树的所有节点的自动迭代工具
    * 节点部分API
    * 事件部分API
    * Range API，比节点API能够更精确的操作DOM树，性能也更好。常用于HTML编辑器

* Node
    * Element：元素型节点，与标签相对应
        * HTMLElement
            * HTMLAnchorElement
            * HTMLAppletElement
            * HTMLAreaElement
            * HTMLAudioElement
            * HTMLBaseElement
            * HTMLBodyElement
            * ...
        * SVGElement
            * SVGAElement
            * SVGAltGlyphElement
            * ...
    * Document：文档根节点
    * CharacterData：字符数据
        * Text：文本节点
            * CDATASection：CDATA节点
        * Comment：注释
        * ProcessingInstruction：处理信息
    * DocumentFragment：文档片段，常与Range一起使用
    * DocumentType：文档类型

导航类操作  
节点的导航  
* parentNode
* childNodes
* firstChild
* lastChild
* nextSibling
* previousSibling  

元素的导航  
* parentElement
* children
* firstElementChild
* lastElementChild
* nextElementSibling
* previousElementSibling

parentNode与parentElement两个API是等价的，出于API设计的美感的角度考虑  
一个非Element的node是不可能有子节点的  
父节点一定是Element  

修改操作  
* appendChild
* insertBefore
* removeChild
* replaceChild

前面两个一组，最小化的原则，10个节点一共11个位置，前10个位置插入可以用insertBefore，最后一个位置可以用appendChild  
移除一个元素只能先找到元素的parent，才可以remove  
replaceChild = remove + insert  
很多API变成了历史上的财富，很多API变成了历史上的包袱  

高级操作  
* compareDocumentPosition是一个用于比较两个节点中关系的函数
* contains 检查一个节点是否包含另一个节点的函数
* isEqualNode 检查两个节点是否完全相同，只要在DOM树的结构相同就返回true，避免了序列化
* isSameNode 检查两个节点是否是同一个节点，实际上在JavaScript中可以用“===”
* cloneNode复制一个节点，如果传入参数true，则会连同子元素做深拷贝

事件API  
Event：冒泡与捕获  
先捕获，再冒泡  
addEventListener不传第三个参数useCapture，默认为false，所以默认为冒泡的事件监听

iterator迭代器：没什么实际用途，风格过于老旧，没有与现代JavaScript相结合，被淘汰的状态

Range API  
操作半个节点或者操作批量节点  
对DOM树操作的万能API，并且更加精确  
  
把一个元素所有子元素逆序  
* 子元素取出来是living collection
* insert DOM树已经存在的node，会先remove，再insert到新的位置

Range API  
* var range = new Range()
* range.setStart(element, 9)
* range.setEnd(element, 4)
* var range = document.getSelection().getRangeAt(0)

HTML文档流里面有起始点和一个终止点的一段范围  
Range是不能够跳的，一定是连续的  
Range有一个起点和终点，只要起点在DOM树里的位置先于终点就可以，不需要管这个层级关系  
起始点是由一个element和偏移值决定的  
对于element来说，它的偏移值就是children  
对于text node来说，偏移值就是文字的个数  

range不一定是包含了一个完整的节点的，它可以包含半个节点  
range除了手动指定起止点的方法，还可以通过selection来创建range  

* range.setStartBefore
* range.setEndBefore
* range.setStartAfter
* range.setEndAfter
* range.selectNode
* range.selectNodeContents

* var fragment = range.extractContents() // 删
* range.insertNode(document.createTextNode(‘aaa’)) // 加

fragment也是node的一个子类，能够容纳一些元素，append时，自己不会被append到DOM树上，会把它自己的子节点代替它自己放上去  
range负责在DOM树上选中，并且把它摘下来，fragment可以批量的把它append上去     

CSSOM是对CSS所描述的文档的抽象  
DOM是对HTML所描述的文档的抽象  

document.styleSheets  

Rules  
* document.styleSheets[0].cssRules
* document.styleSheets[0].insertRule(“p { color:pink;}”, 0)
* document.styleSheets[0].removeRule(0)

Rule  
* CSSStyleRule
    * selectorText String
    * Style K-V结构
* CSSCharsetRule
* CSSImportRule
* CSSMediaRule
* CSSFontFaceRule
* CSSPageRule
* CSSNamespaceRule
* CSSKeyframesRule
* CSSSupportsRule
* …...

通过CSSOM批量地修改样式  
getComputedStyle
* window.getComputedStyle(elt, pseudoElt);
    * elt想要获取的元素
    * pseudoElt可选，伪元素

通过getComputedStyle获取一些元素真实的比如transform，比如元素要去做拖拽  
CSS动画，中间态，暂停动画  

CSSOM View  
在完成了layout之后，实际上渲染出来的CSS的图形也会包含一部分属性  

window  
* window.innerWidth, window.innerHeight：代表了viewport，实际渲染的宽度和高度
* window.outerWidth, window.outerHeight
* window.devicePixelRatio：屏幕上的物理像素与代码里面的逻辑像素px之间的比值
* window.screen
    * window.screen.width
    * window.screen.height
    * window.screen.availWidth
    * window.screen.availHeight

* window.open(“about:blank”, “_blank”, “width=100,height=100,left=100,right=100”)
* moveTo(x, y)
* moveBy(x, y)
* resizeTo(x, y)
* resizeBy(x, y)

scroll
* scrollTop
* scrollLeft
* scrollWidth
* scrollHeight
* scroll(x, y) === scrollTo(x, y)
* scrollBy(x, y)
* scrollIntoView()

window
* scrollX
* scrollY
* scroll(x, y) === scrollTo(x, y)
* scrollBy(x, y)

layout
* getClientRects()：伪元素本身也会参与到元素的获取生成盒的过程中
* getBoundingClientRect()：正好圈住所有的盒

伪元素在页面上是无法被选中的，无法copy  

其他API  
API主要来自于以下标准化组织  
* khronos - 在计算机图形和视频方面非常有权威性
    * OpenGL
    * WebGL
* ECMA
    * ECMAScript
* WHATWG - 从W3C分裂出去的子组织，与W3C高度合作
    * HTML
* W3C
    * webaudio
    * CG(Community Group) / WG(Working Group) / IG(Interesting Group)
