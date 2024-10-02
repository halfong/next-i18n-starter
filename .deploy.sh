#!/bin/bash

# 定义本地文件夹路径
localFolder="./out"

# 定义远程服务器信息
remoteUser="ubuntu"
remoteHost="124.221.27.143"
remoteFolder="/var/www/holli/next"

# 使用rsync命令通过SSH上传文件夹
npm run build
rsync -avz --update -e ssh $localFolder $remoteUser@$remoteHost:$remoteFolder