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
    print("Creating Save-LoRa Web server configuration")
    groupvars.append("")
    groupvars.append("# Save Lora WebServer Configuration")
    groupvars.append("save_lora_web_host: \"" + constant.SAVE_LORA_WEB_HOST + "\"")
