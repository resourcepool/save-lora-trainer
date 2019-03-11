#!/usr/bin/env python3

import dockers
import mqtt
import savelora
import saveloraweb
import loraserver
import utils
import constant

groupvars = []
mqtt.setup(groupvars)
savelora.setup(groupvars)
saveloraweb.setup(groupvars)
loraserver.setup(groupvars)
dockers.setup(groupvars)

utils.replace(constant.ANSIBLE_GROUPVARS_FILE, constant.ANSIBLE_BEGIN_TOKEN, constant.ANSIBLE_END_TOKEN, groupvars)
