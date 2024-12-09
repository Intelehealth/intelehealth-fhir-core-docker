#!/bin/bash
cd /root/tomcat/
unzip apache-tomcat-8.5.100.zip
mkdir /opt/tomcat8/
mv apache-tomcat-8.5.100/* /opt/tomcat8/
chmod -R 777 /opt/tomcat8/