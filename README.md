# xbdj-mp
鲜宝到家小程序

### 安装 MPX

1. 在已有文件夹内创建mpx工程：(当前文件夹名就是项目名)

```shell
mpx init .
```

2. 启动服务，mpx会将源码编译成小程序识别的代码，并监听文件变化进行重编译

```shell
npm install
npm run watch
```

3. 配置小程序根目录，在`project.config`添加配置

```json
"miniprogramRoot": "dist/",
"setting": {
  "urlCheck": false,
  "es6": true,
  "postcss": true,
  "minified": true,
  "newFeature": true,
  "nodeModules": true,
  "autoAudits": false,
  "uglifyFileName": true,
  "checkInvalidKey": true
},
```

4. 用小程序 IDE 打开项目


### 安装 sass-loader 

```shell
npm install sass-loader node-sass --save-dev
```

### 安装 Vant

1. 在项目目录下正常安装 `vant-weapp`
> 在 `MPX` 中使用第三方包，不需要构建 `npm` ，`MPX` 会自动检查你使用的 `npm` 包，并按需编译到 `dist` 目录中。

```shell
npm i vant-weapp -S
```

2. 引用组件

```json
"usingComponents": {
  "van-button": "vant-weapp/dist/button"
}
```

