学习笔记

TicTacToe实现思路：
1. 棋盘的数据表示：一维数组（一维数组的下标 = i * 3 + j）、二维数组
2. 根据数据表示画出棋盘
3. 添加棋盘格子的点击事件以支持对战交替落子
4. 添加输赢判断逻辑

5. 添加初步AI能力：检查是否即将要赢
6. 添加bestChoice能力：找留给对方最差局面的点（搜索深度，估值问题，胜负剪枝）
7. 人机对战：使用bestChoice进行决策
---
Gobang实现思路：
1. 棋盘的数据表示：一维数组，15 * 15
2. 根据数据表示画出棋盘
3. 添加棋盘格子的点击事件以支持对战交替落子
4. 添加输赢判断逻辑

5. 添加初步AI能力：检查是否即将要赢
6. 添加bestChoice能力：找留给对方最差局面的点
7. 人机对战：无法完全搜索，需要考虑搜索深度？
---
JavaScript异步机制：
- callback: 回调地狱问题
- Promise: 链式调用
- async/await(Promise语法糖)   

generator与异步：
* generator模拟async/await
* async generator

JavaScript函数：
- function
- generator function
- async function
- async generator function

---

前端开发目录：
- HTML
  - 标签
  - 文件API
  - 本地存储
  - XHR与fetch
  - Web Workers和Service Worker
  - Canvas, WebGL
  - 多媒体
- CSS
  - 层叠、优先级和继承
  - 相对单位
  - 盒模型
  - 布局
    - 浮动
    - Flexbox
    - Grid
    - 定位和层叠上下文
    - 响应式
- JavaScript
  - EcmaScript(ES3, ES5, ES6 ... ES2020)
  - DOM
  - BOM