#!/bin/bash

# 定义本地文件夹路径
localFolder="./out"

# 定义远程服务器信息
remoteUser="ubuntu"
remoteHost="43.156.31.186"
remoteFolder="/var/www/holli/next"

# 使用rsync命令通过SSH上传文件夹
rsync -avz --update -e ssh $localFolder $remoteUser@$remoteHost:$remoteFolder