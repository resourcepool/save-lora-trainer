#!/usr/bin/env python3
from gh import playerrepo
import os
import sys
os.chdir(os.path.dirname(os.path.realpath(__file__)))
playerrepo.clone_from_remote()

if (len(sys.argv) != 3):
    print("Usage: python3 deploy_solution.py [chapter] [step]")
    print("Example: python3 deploy_solution.py chapter1 step-2")
    exit(1)
playerrepo.deploy_solution(sys.argv[1], sys.argv[2])
