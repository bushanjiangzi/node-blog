#!/bin/sh
cd D:/feCode/node-blog/logs
cp access.log $(date +%Y-%m-%d).access.log
echo "" > access.log