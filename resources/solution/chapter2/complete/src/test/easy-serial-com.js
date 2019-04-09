const SerialPort = require("serialport");
const conf = require("../conf");

const Readline = SerialPort.parsers.Readline;
const parser = new Readline({delimiter: "\r\n"});

let port;

const init = () => {
    return new Promise((resolve, reject) => {
        port = new SerialPort(conf.tty, {baudRate: 115200}, (err) => {
            if (err) {
                reject(err);
                return;
            }
            port.pipe(parser);
            port.on('error', function(err) {
                console.error(err.message);
            });
            resolve();
        });
    });

};

const destroy = () => {
    return new Promise((resolve, reject) => {
        if (port) {
            port.close((err) => {
                port = null;
                if (err) {
                    reject(err);
                }
                resolve(err);
            });
        }
    });
};

module.exports = {
    init,
    destroy,
};
