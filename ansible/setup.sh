#!/bin/sh

if [ ! -f .server.conf ]; then
  echo "Enter path to servers private key:"
  read key
  echo $key > .server.conf
else
  key=$(sed -n '1p' .server.conf)
  echo "Path to key retrieved from config: $key"
fi

echo "Enter target: [all]"
read target
if [ ${#target} -gt 0 ]; then
 ansible-playbook -i inventories/production ${target}.yml --private-key=${key}
else
 ansible-playbook -i inventories/production site.yml --private-key=${key}
fi
