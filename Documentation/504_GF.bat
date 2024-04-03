@echo off
cls
title Starting USBWebserver
color A

echo Set path to extra signs
chcp 65001

echo Set Variables
SETLOCAL

SET workingDir=%~dp0
SET path2Web=%workingDir%usbwebserver\bin\httpd_z.exe
SET path2Root=%workingDir%usbwebserver
SET path2mainConf=%path2Root%\conf\httpdMain.conf
SET path2conf=%path2Root%\conf\httpd.conf

echo Delete config file
del "%path2conf%" /f

echo Write new variable for DocumentRoot
echo Define path2DocsPC "%workingDir:\=/%">>"%path2conf%"

echo Write the ServerRoot
echo ServerRoot "%path2Root:\=/%">>"%path2conf%"

echo Write complete other config
type "%path2mainConf%">>"%path2conf%"

echo Start Webpage
start "" "http://localhost:8080/504_GF.html"

echo Start server:
cls
echo [91mIf you are done with the html please close this window[0m
"%path2Web%"

ENDLOCAL

cmd /c