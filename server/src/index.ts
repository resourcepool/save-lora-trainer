import * as mqttService from './mqtt/mqtt-service';
import * as httpServer from './web/server';

mqttService.init();
httpServer.init();