UPLOAD_DIR=$1
if [ ! -d "${UPLOAD_DIR}" ] ; then 
 echo "There's not directory ${UPLOAD_DIR} in root";
 exit 1;
fi 

REMOTE_DIR=/root/memrise/;

scp -r ${UPLOAD_DIR} root@121.36.32.150:${REMOTE_DIR} 