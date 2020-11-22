学习笔记

JavaScript
* Atom
* Expression
* Statement
* Structure
* Program/Module

Expression - Atom
* Grammar
    * Grammar Tree vs Priority
    * Left hand side & Right hand side
* Runtime
    * Type Conversion
    * Reference



中缀树   
运算符的优先级会影响到语法树的构成   
在JavaScript标准中是用产生式来描述运算符的优先级   

Expressions   
* Member
    * a.b
    * a[b]
    * foo\`string\`
    * super.b
    * super[ ‘b’ ]
    * new.target
    * new Foo()
* New
    * new Foo

Example：   
new a () (): a后面的第一个括号到底是函数调用（new a返回的函数），还是new运算（new a()）的结果呢？等价于(new a())()   
new new a ()：a后面的括号是和第一个new结合使用还是和第二个new一起结合使用呢？等价于new (new a())   
括号可以省略导致的问题   

Reference — 存在于运行时的类型   
a.b访问了一个属性，但是从这个属性取出来的不是属性的值，而是一个引用。   
引用类型并非JavaScript的8中基本类型之一，称作标准中的类型，而非语言中的类型。   
一个reference分成2个部分：   
* Object
* key：string/symbol

member运算进行加、减等操作的时候，会直接进行解引用，然后使用值   
delete、assign 赋值(=)都会用到reference类型   

Expressions   
* Call
    * foo()
    * super()
    * foo()[‘b']
    * foo().b
    * foo()\`abc\`  

Example:   
new a()[‘b’]: a后面的括号是和a先结合然后传给new呢还是和new结合呢？等价于(new a())[‘b’]   
member expression的优先级高于call expression   

Expressions   
* Left Handside & Right Handside: Left handside expression一定是Right handside expression  

Example:   
a.b = c;   
a+b = c   

Expressions   
* Update
    * a++
    * a--
    * --a
    * ++a
* Unary
    * delete a.b
    * void foo()
    * typeof a
    * \+ a
    * \- a
    * ~ a
    * ! a
    * await a
* Exponental
    * ** : JavaScript中唯一一个右结合的运算符，3 ** 2 ** 3等价于3 ** (2 ** 3)
* Multiplicative
    * \* / %
* Additive
    * \+ -
* Shift
    * << >> >>>
* Relationship
    * < > <= >= instanceof in
* Equality
    * ==
    * !=
    * === 
    * !==
* Bitwise
    * & ^ |
* Logical: 短路原则
    * &&
    * ||
* Conditional: 短路原则
    * ? :


Type Conversion   
* a + b
* “false” == false
* a[0] = 1;   

![Type Conversion](https://github.com/jtandy123/Frontend-05-Template/blob/master/Week%2007/images/type_conversion.png)   

Unboxing   
* ToPrimitive - 拆箱时会进行此转换，转换时会根据对象是否有toString, valueOf, Symbol.toPrimitive这三个属性来进行对应方法的调用
* toString vs valueOf - 作为member访问的时候优先调用toString，否则调用valueOf
* Symbol.toPrimitive - 存在该属性，则忽略toString和valueOf方法
```js
var o = {
  toString() { return ‘2'},
  valueOf() { return 1 },
  [Symbol.toPrimitive]() { return 3 }
}
```
```js
var x = {}
x[o] = 1 // x[3] = 1, 

console.log(‘x’ + o) // x3
```

Boxing   
![boxing](https://github.com/jtandy123/Frontend-05-Template/blob/master/Week%2007/images/boxing.png)  

StringToNumber   
NumberToString   

语法结构   
运算符优先级   
表达式 - 表达式解析中的类型转换   


Statement   
* Grammar
    * 简单语句
    * 组合语句
    * 声明
* Runtime
    * Completion Record - 语句执行结果的记录
    * Lexical Environment

Completion Record - 语句执行结果的记录   
* [[type]]: normal, break, continue, return, throw
* [[value]]: 基本类型
* [[target]]: label  

决定了语句是继续向下执行还是停止执行   
组合语句是如何实现控制能力的   

简单语句   
* ExpressionStatement - 表达式加分号
* EmptyStatement
* DebuggerStatement
* ThrowStatement
* ContinueStatement
* BreakStatement
* ReturnStatement

因为有等号的存在，所以简单语句其实是有一定的副作用，可以改变一些状态的   

复合语句   
* BlockStatement
* IfStatement
* SwitchStatement
* IterationStatement
    * while
    * do-while
    * for
    * for-in
    * for-of
    * for await of
* WithStatement
* LabelledStatement
* TryStatement: try-catch-finally，并不是用block语句来制造的多语句执行的环境，所以try后面的花括号是不能省略的  

for循环的结构里面大部分是不允许in操作符出现   
JavaScript标准里面，所有的语句基本上都会有in的版本和没有in的版本两个   
复合语句多用于控制简单语句的执行顺序   


声明   
* FunctionDeclaration
* GeneratorDeclaration
* AsyncFunctionDeclaration
* AsyncGeneratorDeclaration
* VariableStatement - 既有声明的作用，又有实际的执行计算的能力。JS语法标准中将其归类为语句
* ClassDeclaration
* LexicalDeclaration - const let  

var的声明会被归类到语句当中去   
凡是对后续的语句发生作用的这种语句，都可以归类为声明。和JS标准的划分不一致   

声明   
* function
* function *
* async function
* async function *
* var - 声明作用相当于出现在函数头部，变量已经被声明为了一个函数级的局部变量，但后面的赋值表达式并没有发生，这是其与function函数声明的区别  

共同的特点：作用范围只认function body，而且它们没有先后关系，它们永远会被当做出现在函数的第一行一样去处理   

* class
* const
* let  

共同的特点：在声明之前使用报错   

JavaScript中新旧两代的声明体系   
老的声明体系：function、var   
在新的声明体系中是局部作用域并且它的预处理会帮助把所有在它之前使用的声明的变量报错   


预处理（pre-process）   
在一段代码执行之前JS引擎会对代码本身做一次预先处理   
所有的声明都是有预处理机制的，都可以将一个变量变为局部变量。区别是在const声明之前使用变量会报错，而且这个错误可以被try-catch去处理   


作用域   
作用域链这个概念来自于ES3的标准   
技巧：用花括号将函数分成小节，函数结构明确，避免变量冲突   
大函数   


JS结构化   
JS执行粒度（运行时）   
* 宏任务 - 传给JavaScript引擎的任务
* 微任务（Promise）- 在JavaScript引擎内部的任务。在JavaScript中，只有Promise会产生微任务。微任务里面可能会分成几个不同的函数调用
* 函数调用（Execution Context）
* 语句/声明（Completion Record）
* 表达式（Reference）
* 直接量/变量/this…...

宏任务与微任务   
JavaScript引擎是一个静态的库。在使用JavaScript引擎的时候，会把一段代码传给他。      
![Macro Task And Micro Task](https://github.com/jtandy123/Frontend-05-Template/blob/master/Week%2007/images/macro_task_and_micro_task.png)  


事件循环 - 如何去使用JS引擎的过程      
![Event Loop](https://github.com/jtandy123/Frontend-05-Template/blob/master/Week%2007/images/event_loop.png)  


函数调用   
Execution Context   
Running Execution Context    

Execution Context   
* code evaluation state： async和generator函数使用，保存代码执行到哪儿的信息
* Function：由Function来初始化的会有
* Script or Module
* Generator：Generator函数会用到，generator函数每次执行所生成的隐藏在背后的generator
* Realm：保存所有内置对象
* LexicalEnvironment：保存变量
* VariableEnvironment：var声明

Execution Context分为下面两类：    
ECMAScript Code Execution Context    
* code evaluation state
* Function
* Script or Module
* Realm
* LexicalEnvironment
* VariableEnvironment

Generator Execution Context   
* code evaluation state
* Function
* Script or Module
* Realm
* LexicalEnvironment
* VariableEnvironment
* Generator

LexicalEnvironment - 老的里面只存变量，新的里面有下面几个内容   
* this
* new.target
* super
* 变量

VariableEnvironment - 是个历史遗留的包袱，仅仅用于处理var声明   


Environment Record - 不是一个单纯的结构，会形成一个链式结构。链式结构里面的每一个节点称为ER。ER存在继承关系   
* Declarative ER
    * Function ER
    * Module ER
* Global ER - 只有一个
* Object ER - 给with使用

Function - Closure   
在JavaScript里面每一个函数都会生成一个闭包   
闭包分成了两部分：代码部分和环境部分   
环境部分（Environment Record）由一个object和一个变量的序列来组成   

在JavaScript里面，每一个函数都会带一个它定义时所在的Environment Record。它会将该ER保存到自己的函数对象身上，变成一个属性   
Environment Record链就是原来的scope chain   
闭包和作用域链机制   

Realm   
在JS中，函数表达式和对象直接量均会创建对象   
使用.做隐式装换也会创建对象   
var x = {}; // 创建了一个Object对象   
1 .toString(); // 装箱产生Number对象   
这些对象也是有原型的，如果没有Realm，就不知道它们的原型是什么   
不同的Realm实例之间是完全相互独立的，instanceof可能会失效   