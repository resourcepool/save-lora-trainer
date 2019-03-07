# Chapter 2: Getting around the LoRa node and sending location

## Briefing

Alright John. Focus.  
You have just a few % of battery left.
  
The LoRa node you found is used for something else, you will have to connect it to your computer, connect it to a remote LoRa Network, and send your location.  
That's it. It's THAT simple!
 
### Step 1 - setup your LoRa Device

Years ago, when you were still a student, you built a cool Location sending app along with a Serial terminal.
Let's reuse this as a codebase. 

You will use OTAA (Over-The-Air Activation) and therefore must set a certain number of parameters inside your device.

OTAA requires three parameters :
 * a DevEUI (this one does not need to be changed)
 * an AppEUI (this one needs to be changed)
 * an AppKey (this one needs to be changed)

All Modems are controlled using what we call AT Commands. Fortunately, you also had printed the [documentation of your LoRa Node device](/course/lora-node-guide.pdf)!

Remember what Trinity said in her text: She wants you to change all settings to "42".

That means :
 1. Set the LoRa Node Mode to LoRaWAN
 2. Set the AppEUI to "4242424242424242"
 3. Set the AppKey to "42424242424242424242424242424242"

The boilerplate code was already done in your project. That's a real time-saver.

Unfortunately, you did not know anything about AT Commands so you didn't really implement it... 

**==> Implement the code in `src/tobeimpl/rescue-service.js` and use the relevant AT Commands and payload.**    

Warning: Only implement Step 1 methods, which are : `setModeLoraWan()`, `setAppEui()`, `setAppKey()`  

Good luck.

### Step 2 - Connect to the remote LoRa Network

Your settings are ready. Now implement the method `sendJoinRequest()`

Last but not least, you have to actually send the joinRequest in OTAA mode. And wait.  
If you get an answer, you need to be sure it's a JoinRequest Success answer so you can unlock the step 2.  

### Step 3 - Send your location

Almost done. Your device was registered on the LoRa Network.
The only thing left to do is to send your location. 

However, this one requires to make a bit of binary calculations.    

Chances are that the LoRa Network uses the CayenneLPP protocol to communicate, since it is widely used for sensor data.
  
Good thing is, you have a full documentation of the CayenneLPP protocol and samples in your great LoRaWAN 101 course.

Bad thing is : you need to implement it yourself.

Hurry up, you're almost there!

==> Implement the method `sendGpsLocation()`   
