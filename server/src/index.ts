import * as mqttService from './mqtt/mqtt-service';
import * as httpServer from './web/server';
import * as appServerService from './appserver/appserver-service';
mqttService.init();
appServerService.init();
httpServer.init();
