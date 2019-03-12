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
    print("Creating Save-LoRa app server configuration")
    # Generate Proxy & Public JWTs
    savelorapublicjwt = jwt.encode({
          "sub": "001",
          "name": "Public Idiot",
          "iat": 1546297200
        }, constant.SAVE_LORA_API_PUBLIC_SECRET, algorithm='HS256').decode('utf-8')
    saveloraproxyjwt = jwt.encode({
          "sub": "007",
          "name": "Trinity",
          "iat": 1546297200
        }, constant.SAVE_LORA_API_PROXY_SECRET, algorithm='HS256').decode('utf-8')
    saveloraadminsecret = ''.join(random.SystemRandom().choice(string.ascii_lowercase + string.ascii_uppercase + string.digits) for _ in range(64))
    print("Save LoRa Public Server JWT is " + savelorapublicjwt)
    print("Save LoRa Proxy Server JWT is " + saveloraproxyjwt)
    print("Save LoRa Admin Secret is " + saveloraadminsecret)
    print("Save LoRa Admin Server Credentials are " + constant.SAVE_LORA_API_ADMIN_USERNAME + " " + constant.SAVE_LORA_API_ADMIN_PASSWORD)
    groupvars.append("")
    groupvars.append("# Save Lora AppServer Configuration")
    groupvars.append("save_lora_api_host: \"" + constant.SAVE_LORA_API_HOST + "\"")
    groupvars.append("save_lora_api_public_secret: \"" + constant.SAVE_LORA_API_PUBLIC_SECRET + "\"")
    groupvars.append("save_lora_api_public_jwt: \"" + savelorapublicjwt + "\"")
    groupvars.append("save_lora_api_proxy_secret: \"" + constant.SAVE_LORA_API_PROXY_SECRET + "\"")
    groupvars.append("save_lora_api_proxy_jwt: \"" + saveloraproxyjwt + "\"")
    groupvars.append("save_lora_api_admin_secret: \"" + saveloraadminsecret + "\"")
    groupvars.append("save_lora_api_admin_username: \"" + constant.SAVE_LORA_API_ADMIN_USERNAME + "\"")
    groupvars.append("save_lora_api_admin_password: \"" + constant.SAVE_LORA_API_ADMIN_PASSWORD + "\"")
