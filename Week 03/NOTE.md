学习笔记

使用LL算法构建四则运算的AST  

<br/>

程序编译过程：
- 分词/词法分析：将程序代码字符串分解成代码块（词法单元，token）
- 解析/语法分析：将词法单元流（数组）转换成一个由元素逐级嵌套的程序语法结构的树（抽象语法树，Abstract Syntax Tree, AST）
- 代码生成：将AST转换为可执行代码（一组机器指令）

最著名的语法分析算法的核心思想：LL算法（Left Left, 从左到右扫描，然后从左到右规约）和LR算法

<br/>

四则运算：
- TokenNumber: 0-9
- Operator: +、-、*、/
- Whitespace: &lt;SP&gt;
- LineTerminator: &lt;LF&gt; &lt;CR&gt;

token包括: Number、Operator

<br/>

四则运算：  
&lt;Expression&gt;::=   
&emsp;&lt;AdditiveExpression&gt;<font color=red>&lt;EOF&gt;</font>

<br/>

&lt;AdditiveExpression&gt;::=   
&emsp;&lt;MultiplicativeExpression&gt;   
&emsp;|&lt;AdditiveExpression&gt;<font color=red>&lt;+&gt;</font>&lt;MultiplicativeExpression&gt;   
&emsp;|&lt;AdditiveExpression&gt;<font color=red>&lt;-&gt;</font>&lt;MultiplicativeExpression&gt;

<br/>
 
&lt;MultiplicativeExpression&gt;::=  
&emsp;<font color=red>&lt;Number&gt;</font>   
&emsp;|&lt;MultiplicativeExpression&gt;<font color=red>&lt;*&gt;&lt;Number&gt;</font>  
&emsp;|&lt;MultiplicativeExpression&gt;<font color=red>&lt;/&gt;&lt;Number&gt;</font>

红色字体的为TerminalSymbol，终结符，直接从词法里面扫描出来的  
其他的为NoneTerminalSymbol，非终结符，用终结符的组合定义出来的
   
<br/>

&lt;AdditiveExpression&gt;::=   
&emsp;&lt;Number&gt;  
&emsp;|&lt;MultiplicativeExpression&gt;&lt;*&gt;&lt;Number&gt;  
&emsp;|&lt;MultiplicativeExpression&gt;&lt;/&gt;&lt;Number&gt;  
&emsp;|&lt;AdditiveExpression&gt;&lt;+&gt;&lt;MultiplicativeExpression&gt;   
&emsp;|&lt;AdditiveExpression&gt;&lt;-&gt;&lt;MultiplicativeExpression&gt;
   
