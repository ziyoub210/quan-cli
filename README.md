一个简易的可以用于下载软件包的脚手架 （目前只写了下载功能）
#### 安装
    npm install -g quan-cli
#### 本地运行
    npm run dev 注意：如果要加参数后面要加--, 例：npm run dev -- init --debug
#### 打包
    cnpm run build
#### 使用
    quan-cli -h,--help                                                 查看帮助
    quan-cli -v,--version                                              查看版本
    quan-cli init                                                      创建项目
    quan-cli init --debug,-d                                           创建项目并切打印信息
    quan-cli init -p,--packagePath <dir>                               创建项目到目录内
    quan-cli init -f,--force                                           强制清空目录并且创建项目到目录内
    quan-cli init -p,--packagePath <dir> -f,--force -d,--debug                                                     