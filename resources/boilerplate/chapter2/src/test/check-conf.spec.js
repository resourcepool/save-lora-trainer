"use strict";
const easySerialComService = require("../serial-com");


test("STEP 0 : serial ports is correct in conf => if failed, check that: wisnode is plugged in, your conf (mostly the serial port defined in conf.js under property CHANGEME.tty), your serialport is accessible", async () => {
    try {
        await easySerialComService.init();
        await easySerialComService.destroy();
    }catch (e) {
        expect(e.message).not.toContain("Error: No such file or directory,");
        expect(e.message).toEqual('Error Resource temporarily unavailable Cannot lock port');
    }
});