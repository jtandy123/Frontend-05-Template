学习笔记

* 线上服务系统
* 发布系统
* 发布工具：命令行工具

单机同级部署线上服务系统和发布系统   

step 1: 初始化Server，ubuntu，安装node和npm  
```
$ sudo apt install nodejs
$ sudo apt install npm
$ sudo npm install -g n
$ sudo n latest
```

step 2: 编写线上Web服务  
服务器框架Express: express-generator   
集群形态的服务  
前后端混部  

监控  
错误恢复  
线上重启  

前后端彻底分离的发布模式：前端代码发静态HTML，服务端的数据由HTML和JS里面再去做Ajax请求再去获取  
   
前后端混合部署：方案需要与服务端同学一起协商，前端是否有自主独立的发布权限   
服务器集群的状况和部署的措施还与运维有关   
视公司的实际情况进行沟通   
   
step 3: 部署服务至服务器   
启动服务器上的ssh服务：
```   
$ service ssh start   
```
ssh默认在22端口监听，需要配置端口转发，将宿主机上的8022端口转发到虚机上的22端口   
ssh可以远程登录、传文件   
scp命令  
```
$ scp -P 8022 -r ./* jtandy@127.0.0.1:/home/jtandy/server
```
不建议在Server上再进行npm install   
   
发布服务器
发布工具
   
服务器端和客户端的request和response都是流式处理   
发布工具把文件通过http的方式传递给发布服务器   

stream.Readable 可读流：从流里面可以获取数据   
* close event
* data event
* pipe method - 将一个可读的流导入进一个可写的流里面

stream.Writable 可写流   
* write method
* end method

文件 -> HTTP -> 文件  
单文件上传  
   
压缩库：   
- archiver - 压缩
- unzipper - 解压，输出流
   
多文件场景  
压缩文件 -> HTTP -> 压缩文件，解压   
   
OAuth登录   
* publish-tool：
    * 1. 打开https://github.com/login/oauth/authorize?client_id=xxx
    * 3. 创建server，接收token，后点击发布
* publish-server:
    * 2. auth路由：接收code，调用github接口，用code + client_id + client_secret换access_token
    * 4. publish路由：用access_token获取用户信息，检查权限，接受发布
![publish system oauth](https://github.com/jtandy123/Frontend-05-Template/blob/master/Week%2019/publish-system-oauth.png)

与公司权限系统集成
