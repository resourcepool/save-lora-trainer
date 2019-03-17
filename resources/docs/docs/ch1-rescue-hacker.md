# Chapter 1: Hacking Gotham City's LoRa Network

## Briefing

Your name is Trinity.  
You are the one who sent the message to your friend John.  
You are leading a community of hackers. 
By chance, you were outside when the earthquake happened and you are fine. 
Your computer gear as well, thanks for asking.  

Your city (Gotham) has a network of **LoRa-nodes** and **Gateways** which receive sensor-data from hundreds of devices spread across the region.  
This data is then processed by the city council main LoRa App Server, called Gotham-IoT, which manages all device-authorization and exposes a REST & gRPC API for back-office apps used by the city council.  

As all the security systems are down, you made your way inside the City Council building and managed to get into the DMZ.
You are connected to the production private network, still running on batteries.

After looking around, you found
 * an unrestricted access to the City's MQTT broker, the one which gets ALL LoRa trafic.
 * a restricted but insecure access to the Gotham-IoT server that manages all device-authorization / messaging of the network.


## Main Goal

Your main goal is to allow your friend to send his Geo-Location via a LoRa packet.  
Once you have this, you can alert the local authorities and get him safe.

However, there are a few issues :
 * Devices follow a specific activation process and people can't just emit packets on the network.
 * Once devices are activated, sending data must follow a specific protocol and can't just be sent in plain text.

Your mission, if you accept it, will be to **tap into** the **MQTT broker** and listen to all the packets, 
**identify** your device attempts to Join the network (**JoinRequest**), and **use** your access to the **Gotham-IoT server** to register it **yourself**. 

 * **Step 1**: connect to the remote MQTT broker and subscribe to all topics using a wildcard.
 * **Step 2**: decode a join-request
 * **Step 3**: if the join-request has the right identifier (that only you and your friends know), make it join the network. 

A template has been provided, you are supposed to implement functions containing a `//TODO`.  
 The package `noedit` is used internally and... not meant to be edited.  
The file `api.js` is a helper which you can read and use. You should not edit its content.

### Step 1 - Connecting to the MQTT Broker
The MQTT broker is exposed on FIXME `5.135.162.148:1883`. 
MQTT is a typical async message protocol used for IoT. 
To subscribe to all topics, you may have to use a **wildcard**...  
We have provided a MQTT client, you might find the useful doc here: [https://github.com/mqttjs/MQTT.js](https://github.com/mqttjs/MQTT.js)

### Step 2 - Decoding a Join Request

Now that you are receiving all the messages of all the gateways, you start noticing that there are multiple types of messages and structures.
Some of them are encrypted, some other are not.  
Before they can start sharing data on a Network, the devices follow an activation process called OTAA (Over-The-Air Activation).  
We will look into the process later. For now the only thing you need to know is the following:  

When a device attempts to join a LoRaNetwork, it sends JoinRequests.  
A JoinRequest contains:
 * its **unique ID** called Device EUI or DevEUI (<=> Mac Address)
 * a target **Application ID** (see it as a **Realm**)
 * other info (DevNOnce, MIC) that we won't worry about today...

The good thing about JoinRequests is that they are **not** Encrypted.  
That means we can easily decode them from the MQTT broker packets!  

To understand how to spot a Join Request, you need to read the binary protocol used to encode the payload. You should read your LoRaWAN 101 course... [Here's a link if you don't have it](/resources/course/lorawan-101-course.md).

**How to spot a JoinRequest:**  
  A join request can be recognized by the following:
 * the message has a field called "phyPayload" containing base64 encoded data 
 * the binary message of phyPayload has the following Mac Header (first byte of phyPayload): 0b00000000
  
Now that you have found which Packets are JoinRequests, you need to extract its metadata from the binary buffer.

Fill-out the **JoinRequestPacketDecoder** methods to do so.  
We are looking for the AppEUI, the DevEUI, the DevNOnce and the MIC.  

**Important:**  
Hint 1:  
Your friends know the **answer to life, the universe, and everything** (which is **42**, by the way!).  
You can assume that the AppEUI will be 42:42:42:42:42:42:42:42  

Hint 2:  
Your friends all bought the same LoRa Device which is from the manufacturer Unicorn Inc.  
The Manufacturer's DevEUI (<=> MAC Address) all start with **13:37:00:00**:XX:XX:XX:XX

Hint 3:  
The PhyPayload binary protocol stores information in... Little-Endian... [https://en.wikipedia.org/wiki/Endianness](https://en.wikipedia.org/wiki/Endianness) 

**Tests:**
To make your life easier, we have implemented a sequence of tests to validate this.  
Just run `npm test` and it should give you a head start

### Step 3 - Activating the device
Now that we know how to decode a Device JoinRequest, we need to implement the necessary steps to activation in the Gotham-IoT server.  

The OTAA concept is very simple:  
 * The device sends a JoinRequest containing its **unique ID** called Device EUI or DevEUI (<=> Mac Address), the **Application ID**, and other info (DevNOnce, MIC).
 * The Gotham-IoT server checks if the Application has registered the current Device.
 * If the device exists, it will send a JoinAccept response.
 * The GothamIoT server needs to generate a Network Key called NwkKey (it's like a 16-byte **token** set by the Gotham-IoT admin to authenticate your device)
 * After this, the device needs to set the Network Key for all exchanges. 
 
You can find more info on it here: [http://www.techplayon.com/lora-device-activation-call-flow-join-procedure-using-otaa-and-abp](http://www.techplayon.com/lora-device-activation-call-flow-join-procedure-using-otaa-and-abp)

Your friend John Doe has already created a client allowing you to authenticate and communicate with the Gotham-IoT Server.
 
Here is what you need to do:
 * Take the decoded packet and use DevEUI and AppEUI to check if device exists in App.
 * If device does not exist, create it
 * Change the Device NwkKey to `42:42:42:42:42:42:42:42:42:42:42:42:42:42:42:42`
