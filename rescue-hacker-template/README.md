# Rescue-hacker

## Step 1 - Decoding a join-request

 * connect to the remote MQTT broker and subscribe to all topics.
 * decode a join-request
 * if the join-request has the right AppEui, create device-profile on the AppServer
 
 
### The MQTT Broker address
The MQTT broker is exposed on 5.135.162.148:1883

### A Join Request
You will receive all the messages received by all gateways. This is a lot of information.  
You are only concerned by the Join-Request messages.  
A join request can be recognized by the following:
 * the message has a field called "phyPayload" containing base64 encoded data 
 * the binary message of phyPayload has the following Mac Header: 0b00000000

Once you have recognized a join request, you can find the details of the binary structure of the payload [HERE](https://hackmd.io/s/S1kg6Ymo-).  

