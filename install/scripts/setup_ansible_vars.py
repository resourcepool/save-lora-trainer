#!/usr/bin/env python3

import servers
import utils
import constant
import os
os.chdir(os.path.dirname(os.path.realpath(__file__)))

groupvars = []
servers.mqtt.setup(groupvars)
servers.savelora.setup(groupvars)
servers.saveloraweb.setup(groupvars)
servers.loraserver.setup(groupvars)
servers.dockers.setup(groupvars)

utils.replace("../../" + constant.ANSIBLE_GROUPVARS_FILE, constant.ANSIBLE_BEGIN_TOKEN, constant.ANSIBLE_END_TOKEN, groupvars)
