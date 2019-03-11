#!/bin/bash
PROJECT_DIR=`pwd`
# MOSQUITTO CLIENT CONF in
# > ANSIBLE ROLE loraserver
# > server project config (admin)
# > boilerplate/chapter1 config (user)
# > solution/chapter1 config (user)
echo "Creating Mosquitto user for the lora services"
# Read MQTT target host
echo "Enter mqtt host: (default mqtts://broker.save-lora.resourcepool.io"
read HOST
if [ -z "$HOST" ];
then
 HOST=mqtts://broker.save-lora.resourcepool.io
fi
# Generate MQTT users
MQTT_USER=gotham
MQTT_PASSWORD="IAmTheGodOfGothamAndThisPasswordIsSeri0u$"
MQTT_USER2=admin
MQTT_PASSWORD2=$(LC_CTYPE=C tr -dc A-Za-z0-9_\!\$ < /dev/urandom | head -c 32 | xargs)

# Generate mqtt.passwd file
rm ansible/roles/loraserver/files/conf/mosquitto.passwd
touch ansible/roles/loraserver/files/conf/mosquitto.passwd
mosquitto_passwd -b $PROJECT_DIR/ansible/roles/loraserver/files/conf/mosquitto.passwd $MQTT_USER $MQTT_PASSWORD
mosquitto_passwd -b $PROJECT_DIR/ansible/roles/loraserver/files/conf/mosquitto.passwd $MQTT_USER2 $MQTT_PASSWORD2
echo "Client exposed user is $MQTT_USER and password is $MQTT_PASSWORD"
echo "Server exposed user is $MQTT_USER2 and password is $MQTT_PASSWORD2"

# Change server/src/config.ts
BEGIN="\/\/ BEGIN MQTT Client config"
END="\/\/ END MQTT Client config"
sed "/$BEGIN/,/$END/{/\/\/ BEGIN/!{/\/\/ END/!d;};}" $PROJECT_DIR/server/src/config.ts > $PROJECT_DIR/server/src/config2.ts
sed -n "/$BEGIN/{p;:a;N;/$END/!ba;s/.*\n/REPLACEMENT\n/};p" $PROJECT_DIR/server/src/config.ts
MQTT_CONFIG="mqttClient: {
clientId: \"gotham-watchdog\",
host: \"$HOST\",
username: \"$MQTT_USER2\",
password: \"$MQTT_PASSWORD2\"
}"
echo $MQTT_CONFIG

