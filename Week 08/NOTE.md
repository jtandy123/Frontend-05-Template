学习笔记

URL  ---HTTP--->  HTML  ---parse--->  DOM  ---css computing--->  DOM with CSS  ---layout--->  DOM with position  ---render--->  Bitmap

在计算机里面，最后显示在屏幕上的是图片的形式，术语叫做Bitmap  
将bitmap传给显卡驱动设备转化成人眼可识别的光信号

有限状态机
* 每一个状态都是一个机器
    * 在每一个机器里，我们可以做计算、存储、输出…...
    * 所有的这些机器接受的输入是一致的
    * 状态机的每一个机器本身没有状态，如果我们用函数来表示的话，它应该是纯函数（无副作用）
* 每一个机器知道下一个状态
    * 每个机器都有确定的下一个状态（Moore）
    * 每个机器根据输入决定下一个状态（Mealy）

JS中的有限状态机（Mealy）
```js
// 每个函数是一个状态
function state(input) // 函数参数就是输入
{
  // 在函数中，可以自由地编写代码，处理每个状态的逻辑
  return next; // 返回值作为下一个状态
}

// 以下是调用
while(input) {
  // 获取输入
  state = state(input); // 把状态机的返回值作为下一个状态
}
```

HTTP解析

ISO-OSI七层网络模型   
应用   
表示   
会话                          
传输   
网络  
数据链路层                  
物理层

4G/5G/Wi-Fi对应数据链路层和物理层，这两层主要完成对数据的准确地传输，点对点传输，必须要有直接的连接   
Internet对应网络层   
TCP/UDP对应传输层，require(’net’)   
HTTP对应会话层、表示层、应用层，require(‘http’)   

上网：
* 网页所在的应用层协议，外网，World Wide Web，万维网
* 底层负责数据传输，Internet

网页需要可靠传输，使用TCP   

TCP/IP
* 流 - 在TCP层传输数据的概念是流，流没有明显的分割单位，只保证前后的顺序是正确的
* 端口 - TCP协议被计算机里的软件所使用，每一个软件都会去从网卡拿数据，具体哪一个数据是分配给哪一个软件的，通过端口来区分
* require(’net’); - node中的net模块
* 包 - 数据包，可大可小，取决于整个网络中间设备的传输能力
* IP地址 - IP根据地址找到包从哪儿到哪儿，中间有一些大型的路由节点，IP地址唯一标识了连入Internet的每一个设备
* libnet/libpcap - 对应IP协议的底层库，node中没有，但是node底层肯定要调用到C++的这两个库。
    * libnet负责构造IP包并且发送
    * libpcap负责从网卡抓流经你的网卡的IP包

HTTP - 文本型协议
* Request
* Response

Request line: method path protocol/version   
Headers: KV结构   
\r\n   
Body: 由content-type决定，总体上也是KV结构，视content-type不同使用不同的分隔的字符和不同的格式 


Status line: protocol/version code desc   
Headers: KV结构   
\r\n   
Body: 由content-type决定。比较典型的格式为chunked body，由node默认返回的一种body的格式   


chunked body  
十六进制的数字单独占一行  
内容部分  
十六进制的0   


第一步：实现一个http请求
* 设计一个HTTP请求的类Request：首先可以从它的用法上开始去设计，一般去实现一些基础库的时候，都会习惯先从它的使用开始去设计它的接口的形式
* Content-Type是一个必要的字段，要有默认值
* body是KV格式
* 不同的Content-Type影响body的格式  

第二步：send函数
* 在Request的构造器中收集必要的信息
* 设计一个send函数，把请求真实发送到服务器
* send函数应该是异步的，所以返回Promise   

第三步：发送请求
* 设计支持已有的connection或者自己新建connection
* 收到数据传给parser
* 根据parser的状态resolve Promise   

第四步：ResponseParser总结
* Response必须分段构造，所以要用一个ResponseParser来“装配”
* ResponseParser分段处理ResponseText，用状态机来分析文本的结构   

第五步：BodyParser总结
* Response的body可能根据Content-Type有不同的结构，因此我们会采用子Parser的结构来解决问题
* 以TrunkedBodyParser为例，同样用状态机来处理body的格式
















