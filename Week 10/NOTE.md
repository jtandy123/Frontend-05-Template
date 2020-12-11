学习笔记

* 排版 - 根据浏览器属性进行排版
* 排版 - 分行：收集元素进row
* 排版 - 计算主轴
* 排版 - 计算交叉轴
* 渲染 - 绘制单个元素
* 渲染 - 绘制DOM树

CSS中包含着三代的排版技术：  
* 第一代 - 正常流，接近于古典的排版策略：position、display、float等属性
* 第二代 - flex，比较接近人的自然思维
* 第三代 - grid
* 第四代 - CSS Houdini

main axis 主轴   
cross axis 交叉轴，与主轴垂直   

flex-direction决定main axis是哪个方向   
* row - main axis是横向
    * Main: width x left right
    * Cross: height y top bottom
* column - main axis是纵向
    * Main: height y top bottom
    * Cross: width x left right


收集元素进row是为了后面计算元素位置的准备工作   
* 分行
    * 根据主轴尺寸，把元素分进行
    * 若设置了no-wrap，则强行分配进第一行
当元素所有子元素的尺寸超过父元素的主轴尺寸的时候，就会进行分行。把flex容器的子元素flex item，把它收进各个行里

* 计算主轴方向
    * 找出所有flex元素
    * 把主轴方向的剩余尺寸按比例分配给这些元素
    * 若剩余空间为负数，所有flex元素为0，等比压缩剩余元素

* 计算交叉轴
    * 根据每一行中最大元素尺寸计算行高
    * 根据行高flex-align和item-align，确定元素具体位置

* 绘制单个元素
    * 绘制需要依赖一个图形环境
    * 采用npm包images
    * 绘制在一个viewport上进行
    * 与绘制相关的属性：background-color、border、background-image等。gradient需要WebGL相关的库来处理

* 绘制DOM
    * 递归调用子元素的绘制方法完成DOM树的绘制
    * 忽略一些不需要绘制的节点
    * 实际浏览器中，文字绘制是难点，需要依赖字体库，把字体变成图片去渲染
    * 实际浏览器中，还会对一些图层做compositing
