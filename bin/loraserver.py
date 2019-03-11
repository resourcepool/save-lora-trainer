#!/usr/bin/env python3

import constant
import subprocess
import random
import string
import os
import re
import utils
import jwt

# MOSQUITTO CLIENT CONF in
# > ANSIBLE ROLE loraserver
# > server project config (admin)
# > boilerplate/chapter1 config (user)
# > solution/chapter1 config (user)

def setup(groupvars):
    print("Creating LoRa Server configuration")
    # Generate LoRaServer Secret
    loraserversecret = ''.join(random.SystemRandom().choice(string.ascii_lowercase + string.ascii_uppercase + string.digits) for _ in range(64))
    loraserverjwt = jwt.encode({
          "iss": "lora-app-server",
          "aud": "lora-app-server",
          "nbf": 0,
          "exp": 2147483647,
          "sub": "user",
          "username": constant.LORASERVER_JWT_USER
        }, loraserversecret, algorithm='HS256').decode('utf-8')

    print("LoRaServer secret is " + loraserversecret)
    print("LoRaServer Client JWT is " + loraserverjwt)
    groupvars.append("")
    groupvars.append("# LoraServer Configuration")
    groupvars.append("loraserver_host: \"" + constant.LORASERVER_HOST + "\"")
    groupvars.append("loraserver_api_secret: \"" + loraserversecret + "\"")
    groupvars.append("loraserver_api_jwt: \"" + loraserverjwt + "\"")
    groupvars.append("loraserver_jwt_user: \"" + constant.LORASERVER_JWT_USER + "\"")
    groupvars.append("loraserver_device_profile_id: \"" + constant.LORASERVER_DEVICE_PROFILE_ID + "\"")
    groupvars.append("loraserver_application_id: " + constant.LORASERVER_APPLICATION_ID)
