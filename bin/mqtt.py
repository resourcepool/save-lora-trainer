#!/usr/bin/env python3

import constant
import subprocess
import random
import string
import os
import re
import utils

# MOSQUITTO CLIENT CONF in
# > ANSIBLE ROLE loraserver
# > server project config (admin)
# > boilerplate/chapter1 config (user)
# > solution/chapter1 config (user)

def setup(groupvars):
    print("Creating Mosquitto user for the lora services")
    # Read MQTT target host
    # Generate MQTT users
    mqtt_admin_password = ''.join(random.SystemRandom().choice(string.ascii_lowercase + string.ascii_uppercase + string.digits) for _ in range(32))

    # Generate mqtt.passwd file for ansible role
    os.remove(constant.MQTT_PASSWD_FILE_PATH)
    f = open(constant.MQTT_PASSWD_FILE_PATH, "w+")
    f.close()
    subprocess.run(["mosquitto_passwd", "-b", constant.MQTT_PASSWD_FILE_PATH, constant.MQTT_PUBLIC_USER, constant.MQTT_PUBLIC_PASSWORD])
    subprocess.run(["mosquitto_passwd", "-b", constant.MQTT_PASSWD_FILE_PATH, constant.MQTT_ADMIN_USER, mqtt_admin_password])
    print("Client exposed user is " + constant.MQTT_PUBLIC_USER + " and password is " + constant.MQTT_PUBLIC_PASSWORD)
    print("Admin user is " + constant.MQTT_ADMIN_USER + " and password is " + mqtt_admin_password)
    groupvars.append("")
    groupvars.append("# MQTT Broker Configuration")
    groupvars.append("mqtt_broker_host: \"" + constant.MQTT_HOST.replace("mqtts", "ssl").replace("mqtt", "tcp") + "\"")
    groupvars.append("mqtt_broker_host_forclient: \"" + constant.MQTT_HOST + "\"")
    groupvars.append("mqtt_public_user: \"" + constant.MQTT_PUBLIC_USER + "\"")
    groupvars.append("mqtt_public_password: \"" + constant.MQTT_PUBLIC_PASSWORD + "\"")
    groupvars.append("mqtt_admin_user: \"" + constant.MQTT_ADMIN_USER + "\"")
    groupvars.append("mqtt_admin_password: \"" + mqtt_admin_password + "\"")
