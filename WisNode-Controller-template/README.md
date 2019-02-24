# Geek Victim


## Briefing

Let's make it quick.

Something happened outside. Storm, earthquake, Zombie apocalypse? You don't know, and who cares?? Focus!    
You are trapped in your basement, the door is jammed, the internet is down, your phone doesn't get any signal. So really, what happened is the least of your worries.    

You need to tell where you are to someone and... That doesn't smell so good so far. 

But hey, a geek is never out of resources. Let's think about what you have instead of complaining about what is gone.     
 
Your computer is still working. Hopefully it's a laptop so it doesn't matter if the grid is out.   
And... you still have this little WisNode LoraWan.
 
Really? Sending out your location by radio in 2019? Well.. if that's the only option left...
 
So let's work it out!
 
 
## Main goal
 
Now that you are fully woke up you realize that this apocalypse nightmare you had last week was actually premonitory...    
So this app you were starting to develop (just in case...) will be usefull!    
But sadly, it was only a dream, you never really took the time to finish the application...   
Well, let's do it!

You have this WIP wisnode-controller application, a WisNode LoraWan, a few documentation, and the hope that some LoraWan Gateway is still listening somewhere.     
 
 
### Step 1 - connect to a listening lora-server
 
Last week, you already implemented the front part, and the service sequencing the connection process.    
Sadly, those AT-commands were a bit obscure... So you postponed this part. But since you are organized, you kept all incompleted files in the `src/tobeimpl` directory.    
The first step is then to get a valid connection by implementing the AT-commands to be sent.
 
Remember what you read about this process, you first have to ensure you are in LoraWan mode (since a wisnode can communicate in P2P mode)       
Then, you must set up the config of your Wisnode. Especially the App_eui of this miraculous App able to get your GPS location and send help to you.    

Last but not least, you have to actually send the joinRequest in OTAA mode. And wait.  
If you get an answer, you need to be sure it's a JoinRequest Success answer so you can unlock the step 2.  

### Step 2 - send your location

Once you are connected to a loraserver, you have only one command to send. But this one need a bit of binary calculations.    

You guess that the loraserver uses CayenneLPP protocol to communicate, since it is widely used for data transfer and... GPS Location transfer.  

But sadly, you forgot to download a library implementing this protocol, and now that the internet is down... You will have to implement it on your own.  
