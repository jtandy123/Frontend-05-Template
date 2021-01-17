学习笔记

JavaScript处理帧的方案：  
```js
setInterval(() => {}, 16)

Let tick = () => {

  setTimeout(tick, 16)
}

let tick = () => {

  let handler = requestAnimationFrame(tick) // 申请浏览器执行下一帧的时候执行tick方法
  cancelAnimationFrame(handler)
}
```
动画 16ms：人眼能够识别的动画的一个最高的帧率是每秒60帧  

属性动画：属性从一个值变为另一个值  
帧动画：每秒一张图片  

动画：
* 初步建立Animation和Timeline
* 设计Timeline的更新：requestAnimationFrame
* 给Timeline添加pause和resume功能
* 完善Animation其他功能：delay和timingFunction以及Timeline的reset
* 对Timeline进行状态管理

手势：  
![gesture](https://github.com/jtandy123/Frontend-05-Template/blob/master/Week%2015/gesture.png)
* 鼠标和手势统一处理
* 事件监听
* 事件识别
* 事件派发
* 实现flick事件：如何判断速度？在move的时候可以得到当前这一次move的速度。但是如果只判断两个点之间的速度，根据浏览器实现的不同，会有一个较大的误差。所以对速度的判断应该是取数个点，然后把它进行一个平均。存储一段时间之内的点，来做速度的平均和计算
* 封装：listen => recognize => dispatch
