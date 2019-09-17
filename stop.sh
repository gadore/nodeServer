#!/bin/bash
echo "--------stopserver------->>"  
DIR="$( cd "$( dirname "$0"  )" && pwd  )"
cd $DIR
NAME=`ls | grep App.js`
if [ "${NAME}x" = "x"  ];then
	echo "##########################"
	echo "#                        #"
	echo "#    App not found !     #"
	echo "#                        #"
	echo "##########################"
else
	PORT=`ps -ef | grep ${NAME} | grep -v grep | awk '{print $2}'`
	if [ "${PORT}x" != "x"  ];then
		kill -9 ${PORT}
		echo "##############################"
		echo "#                            #"
		echo "#  port :${PORT} service stop  #"
		echo "#                            #"
		echo "##############################"
	else
		echo "##########################"
		echo "#                        #"
		echo "#    No Server Running   #"
		echo "#                        #"
		echo "##########################"
	fi
fi