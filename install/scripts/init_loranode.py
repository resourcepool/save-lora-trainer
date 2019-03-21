import time
import random
import string
import serial.tools.list_ports

for port in serial.tools.list_ports.comports():
    if port.vid == 6790 and port.pid == 29987:
        try:
            print("Found " + port.device)
            ser = serial.Serial(port.device, 115200)  # open serial port
            dev_eui = '13370000' + ''.join(random.SystemRandom().choice(string.hexdigits) for _ in range(8))
            app_eui = ''.join(random.SystemRandom().choice(string.hexdigits) for _ in range(16))
            app_key = ''.join(random.SystemRandom().choice(string.hexdigits) for _ in range(32))
            print("Device EUI will be " + dev_eui)
            print("App EUI will be " + app_eui)
            print("App Key will be " + app_key)
            print(ser.name)         # check which port was really used
            cmd = 'at+set_config=dev_eui:' + dev_eui + '&app_eui:' + app_eui + '&app_key:' + app_key + '\r\n'
            ser.write(cmd.encode('ASCII'))
            time.sleep(5)
            ser.close()
            print("Initialized " + port.device)
        except:
            print("Cannot initialize " + port.device)

