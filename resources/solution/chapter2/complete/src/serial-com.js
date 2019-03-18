const EventEmitter = require("events");
const SerialPort = require("serialport");
const conf = require("./conf");


const Readline = SerialPort.parsers.Readline;
const parser = new Readline({delimiter: "\r\n"});
const port = new SerialPort(conf.tty, {baudRate: 115200});

port.pipe(parser);

parser.on("data", processReturnFromDevice);

const serialEventEmitter = new EventEmitter();

function processReturnFromDevice(data) {
    if (data === "Welcome to RAK811") {
        serialEventEmitter.emit("reset");
        serialEventEmitter.emit("server-response-raw", "resetting...");
    }
    console.log(data);
    serialEventEmitter.emit("server-response-raw", data);
    serialEventEmitter.emit("data-from-device", data);

}

const sendCommand = (cmd) => {
    const cmdCompleted = cmd + "\r\n";
    port.write(cmdCompleted);
    serialEventEmitter.emit("cmd-sent", cmd);
};

const sendPayload = (payload) => {
    const cmd = "at+send=" + payload.type + "," + payload.port + "," + payload.data;
    sendCommand(cmd);
};

const debug = () => {

    SerialPort.list((err, ports) => {
        //console.log('ports', ports);
        if (err) {
            console.log("ERROR : " + err.message);
            return
        }

        if (ports.length === 0) {
            console.log("WARN : " + 'No ports discovered');
        }
        ports = ports.filter((port) => {
            return port.manufacturer !== undefined
        });

        if (ports.length === 0) {
            console.log("WARN : " + 'No wisnode discovered');
        }
        ports.forEach(port => {
            if (port.manufacturer) {
                console.log(port);
            }
        })
    })
};


module.exports = {
    serialEventEmitter,
    sendPayload,
    sendCommand,
    debug
};
