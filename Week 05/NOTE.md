学习笔记

### proxy与双向绑定   
不推荐在业务中大量使用proxy。object使用了proxy代理后, 程序预期性变差，属性的访问和赋值的后面可能有大量其他的操作  
proxy为底层库设计的特性   

proxy代理object后，为object新增属性也会触发set钩子  
使用proxy代理后返回的对象去访问属性，才会触发proxy的hook方法

proxy代理object：
- 在get钩子方法中返回object对应的属性
- 在set钩子方法中将新的value赋值给object对应的属性

粗暴版本：  
不区分是否使用了某个对象的属性，只要设置object的属性值，则将所有的callback都执行一遍，不论callback中是否有使用当前更新的object的属性。   
此版本，object和callback数量多了之后存在性能问题。

reactive实现原理：
- 执行effect方法时，主动执行一次callback。执行callback的过程中，需要收集callback中使用了该object的哪些属性，触发proxy的get钩子方法，callback依赖的object和prop保存在Array<[objec, prop]>中。
- callback执行完毕后，遍历Array<[objec, prop]>，构造出Map<object, Map<prop, callbacks>>的查询依赖结构，即object的prop属性被哪些callback所依赖。这是搜集依赖的过程。  
- 设置object属性值时，触发proxy的set钩子方法，从Map<object, Map<prop, callbacks>>中取出对应object[prop]的callbacks数组，遍历和执行所有使用了该属性的callbacks。执行时使用的是object[prop]的最新值。未使用到的callback方法不会执行。

- reactive方法：参数为object，通过proxy对object进行代理，使得参数object变成observable的对象，监听对象属性的访问和设值。
- effect方法：参数为callback，通过主动调用callback一次，搜集依赖object[prop]的callback。依赖查询路径：object -> prop -> callbacks。
> reactive方法中，需要注意的两点：
> - 对已经reactive的object进行缓存
> - get钩子函数中获取的object[prop]仍为一个对象时，需要递归reactive处理object[prop]

双向绑定：   
- 数据->DOM的绑定：上述reactive和effect方法实现了object[prop]的值更新时，触发所有使用了该属性的传入effect的callback，在callback的方法体中可进行DOM元素的更新
- DOM->数据的绑定：通过DOM元素的监听事件来实现，在监听事件的回调函数中对object对应的prop进行更新。对prop的值更新时，可通过新旧值的比对来判断是否需要触发effect中callback的执行

### Drag Drop
拖拽骨架代码：
```js
const dragable = document.getElementById('dragable');
dragable.addEventListener('mousedown', event => {
  const up = event => {
    document.removeEventListener('mousemove', move);
    document.removeEventListener('mouseup', up);
  };
  const move = event => {
    console.log(event);
  };

  document.addEventListener('mousemove', move);
  document.addEventListener('mouseup', up);
});
```
- 在document上对mousemove和mouseup事件进行监听，避免在dragable上进行监听，防止鼠标移动过快超出dragable范围后鼠标事件丢失。
- startX, startY：避免拖拽时dragable的位置总是在鼠标指针位置后面的问题
- baseX, baseY：避免二次拖拽时，dragable的位置计算错误问题

### Range & CSSOM
- Range: 表示一个包含节点与文本节点的一部分的文档片段
- Range.getBoundingClientRect(): 返回一个 DOMRect 对象，该对象将范围中的内容包围起来；即该对象是一个将范围内所有元素的边界矩形包围起来的矩形。此方法可用于确定文本区域中选中的部分或光标的视窗坐标。
