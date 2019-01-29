import mqtt, {MqttClient} from 'mqtt';

const client: MqttClient = mqtt.connect('mqtt://192.168.1.99:1883');


client.on('connect', function () {
    client.subscribe("#", function (err) {
        if (!err) {
            client.publish('presence', 'Hello mqtt');
        }
    });


    client.subscribe("gateway/b827ebfffe66de4b/tx", function (err) {
        if (!err) {
            console.log("Ohh yes");
        }
    });
    client.subscribe("gateway/b827ebfffe66de4b/rx", function (err) {
        if (!err) {
            console.log("Ohh yeah");
        }
    });


});

client.on('message', function (topic, message) {
    // message is Buffer
    console.log(topic.toString());
    console.log(message.toString());
    client.end();
});