#!/bin/bash
npm run build-prod
docker build -t resourcepool/save-lora-website .
docker push resourcepool/save-lora-website
