# Save-LoRa Trainer

This workshop is aimed at introducing people to IoT networking (via LoRaWAN 0G) through a "humanitarian-hacking" use-case.

The game briefing and details are in the `guide/` folder.

## Requirements

This game requires : 
 * Two public production servers with domain-names
 * One Github repository for players
 * RAK811 Wisnode LoRa Nodes (as much as you have players)

## Deploy

To deploy the game :
 1. Change all constants in bin/constants.py
 2. Run `python3 bin/setup.py`
 3. Run playbook `ansible/site.yml` to setup your production servers
