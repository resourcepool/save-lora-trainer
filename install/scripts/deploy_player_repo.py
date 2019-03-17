#!/usr/bin/env python3
from gh import playerrepo
import os
os.chdir(os.path.dirname(os.path.realpath(__file__)))
playerrepo.init_with_resources()
playerrepo.commit_and_push_force()
