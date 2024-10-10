#!/bin/bash

# 定义本地文件夹路径
localFolder="./out"

# 定义远程服务器信息
remoteUser="ubuntu"
remoteHost="xxx.xxx.xxx.xxx"
remoteFolder="/path/to/dist"

# 使用rsync命令通过SSH上传文件夹
npm run build
rsync -avz --update -e ssh $localFolder $remoteUser@$remoteHost:$remoteFolder