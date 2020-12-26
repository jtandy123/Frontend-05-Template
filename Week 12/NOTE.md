学习笔记

标签 - Tag，源代码   
元素 - Element，语义   
盒 - Box，表现   

* HTML代码中可以书写开始标签，结束标签和自封闭标签  
* 一对起止标签，表示一个元素  
* DOM树中存储的是元素和其他类型的节点（Node）
    * DOM树中存储的内容称为Node，不都是Element
    * CDATA节点，文本节点，注释节点都不是元素
* CSS选择器选中的是元素
* CSS选择器选中的元素，在排版时可能产生多个盒
* 排版和渲染的基本单位是盒

盒模型：margin、border、padding   
box-sizing
* content-box: width + padding + border + margin
* border-box: width + margin

* Normal Flow
* Flex
* Grid
* Houdni

CSS的排版的内容包括盒和文字   
如何写字？
* 从左到右书写
* 同一行写的文字都是对齐的
* 一行写满了，就换到下一行

正常流排版
* 收集盒和文字进行
* 计算盒和文字在行中的排布
* 计算行的排布

IFC（Inline Formatting Context）: inline-level-box  
BFC（Block Formatting Context）:
* line-box
* block-level-box

设立BFC

正常流的行级排布   
行模型   
line-top  
text-top  
base-line  
text-bottom  
line-bottom  

line-top和line-bottom的偏移问题，盒的先后顺序和盒的尺寸会影响line-top和line-bottom的位置，但不会影响text-top和text-bottom

正常流的块级排布   
float与clear   
margin折叠：只会发生在正常流的BFC里面，不会发生在IFC或者其他的排版模式中   

float + margin collapse + BFC

BFC合并
Block
* Block Container：里面有BFC的
    * 能容纳正常流的盒，里面就有BFC
* Block-level Box：外面有BFC的
* Block Box = Block Container + Block-level Box：里外都有BFC的

Block Container
* block
* inline-block
* table-cell
* flex item
* grid cell
* table-caption

Block-level Box   
Block level
* display: block
* display: flex
* display: table
* display: grid

Inline level   
* display: inline-block
* display: inline-flex
* display: inline-table
* display: inliine-grid

display: run-in

设立BFC
* floats
* absolutely positioned elements
* block containers (such as inline-blocks, table-cells, and table-captions) that are not block boxes
    * flex items
    * grid cell
* and block boxes with ‘overflow’ other than ‘visible'

BFC合并
* block box && overflow: visible
    * BFC合并与float
    * BFC合并与边距折叠

Flex排版
* 收集盒进行
* 计算盒在主轴方向的排布
* 计算盒在交叉轴方向的排布

分行
* 根据主轴尺寸，把元素分进行
* 若设置了no-wrap，则强行分配进第一行

计算主轴方向
* 找出所有Flex元素
* 把主轴方向的剩余尺寸按比例分配给这些元素
* 若剩余空间为负数，所有flex元素为0，等比压缩剩余元素

计算交叉轴方向
* 根据每一行中最大元素尺寸计算行高
* 根据行高flex-align和item-align，确定元素具体位置

CSS控制表现：
* 控制元素位置和尺寸信息
* 控制绘制与渲染的信息
* 控制交互与动画的信息

CSS动画与绘制  
Animation
* @keyframes定义
* animation: 使用
```css
@keyframes mykf
{
  from {background: red;}
  to {background: yellow;}
}

div
{
  animation: mykf 5s infinite;
}
```

* animation-name 时间曲线
* animation-duration 动画时长
* animation-timing-function 动画的时间曲线
* animation-delay 动画开始前的延迟
* animation-iteration-count 动画的播放次数
* animation-direction 动画的方向

keyframes的定义可以使用百分比也可以使用from to  
```css
@keyframes mykf {
  0% { top: 0; transition: top ease; }
  50% { top: 30px; transition: top ease-in; }
  75% { top: 10px; transition: top ease-out; }
  100% { top: 0; transition: top linear; }
}
```

Transition
* transition使用
    * transition-property 要变换的属性
    * transition-duration 变换的时长
    * transition-timing-function 时间曲线
    * transition-delay 延迟

timing-function来自于一个三次贝塞尔曲线

贝塞尔曲线：
* 一次贝塞尔曲线：点沿P0 -> P1直线运动，时间t从0到1的过程
* 二次贝塞尔曲线：增加一个控制点P2，两个绿色点分别沿P0->P1,P1->P2做贝塞尔曲线，两个绿色点之间再用贝塞尔曲线进行插值，得到一个黑色点的运动轨迹，时间t从0到1的过程
* 三次贝塞尔曲线：再增加一个控制点P3，三个绿色点分别沿P0->P1,P1->P2,P2->P3做贝塞尔曲线，三个绿色点之间再用贝塞尔曲线进行插值，得到两个蓝色点，两个蓝色点之间再用贝塞尔曲线进行插值，得到一个黑色点的运动轨迹，时间t从0到1的过程

贝塞尔曲线的定义无法用来计算贝塞尔曲线的形状，关于X和Y的方程和坐标，需要使用牛顿积分法来计算

贝塞尔曲线拟合：理论上讲用控制点可以拟合任何的形状

可以拟合直线  
可以拟合抛物线  
不可直接拟合圆形  
拟合圆弧

CSS动画与绘制 — 颜色  
光的颜色就是光的波长  

单色光  
自然界中大部分都是多个颜色的光混合在一起  
人眼可见波长400nm~760nm之间的光   

CMYK与RGB  
人的眼睛里用于感受颜色感受强光的视锥细胞，只有三种视锥细胞，分别能感应红绿蓝三原色的光
  
品红、黄和青，这三个颜色是红绿蓝的补色   
颜料是吸收对应的光的，光是混合起来增强对应的光的   

在印刷行业里，都会使用CMYK颜色。彩色的颜料贵，得把CMY混合在一起，才能产生黑色K。黑色是一种非常便宜的油墨  
CMYK，最大化的去使用K   
  
在编程的过程中，RGB颜色和CMYK颜色并不好用，它们与人对颜色的认知的直觉是不一致的，跟人的生理结构是一致的  

HSL与HSV  
Hue 色相，在6种基本颜色之间，拼成一个色盘，表示颜色  
Saturation 纯度，S越高就越鲜艳越漂亮，表示鲜艳程度  

Lightness 亮度，上下对称，0是黑色，100是纯白色，纯色需要取中间值，表示明暗关系   

Value 表示Brightness 明度，value到100%的时候，颜色变成一个最亮的纯色，表示明暗关系   

W3C采用HSL。HSL和HSV可以互相转换  

CSS动画与绘制 — 绘制  
* 几何图形
    * border
    * box-shadow
    * border-radius
* 文字
    * font
    * text-decoration
* 位图
    * background-image

应用技巧   
* data uri + svg
```xml
data:image/svg+xml,<svg width=“100%" height=“100%" version="1.1" xmlns="http://www.w3.org/2000/svg"><ellipse cx=“300" cy=“150" rx=“200" ry=“80" style="fill:rgb(200,100,50);stroke:rgb(0,0,100);stroke-width:2"/></svg>
```
