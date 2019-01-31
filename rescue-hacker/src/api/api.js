const path = require("path");
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const ROOT_PROTO_PATH = path.resolve(__dirname, "../../../lora-server/grpc");
const AS_PROTO_PATH = path.resolve(ROOT_PROTO_PATH, "as");
const COMMON_PROTO_PATH = path.resolve(ROOT_PROTO_PATH, "common");
const GW_PROTO_PATH = path.resolve(ROOT_PROTO_PATH, "gw");
const NC_PROTO_PATH = path.resolve(ROOT_PROTO_PATH, "nc");
const NS_PROTO_PATH = path.resolve(ROOT_PROTO_PATH, "ns");

// Load Protobufs Synchronously
const packageDefinition = protoLoader.loadSync(path.resolve(NS_PROTO_PATH, "ns.proto"), {
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
  includeDirs: [ROOT_PROTO_PATH]
});

const packageObject = grpc.loadPackageDefinition(packageDefinition);
//protoDescriptor.ns.NetworkServerService
const networkServerService = new packageObject.ns.NetworkServerService('localhost:8000', grpc.credentials.createInsecure());//NetworkServerServiceClient('localhost:8000', grpc.credentials.createInsecure(), {});

const createDevice = (device) => {
  //let req = new CreateDeviceRequest();
  //let device = new Device();
  //device.setDevEui(dto.devEui);
  //device.setDeviceProfileId(dto.deviceProfileId);
  //device.setServiceProfileId(dto.serviceProfileId);
  //device.setRoutingProfileId(dto.routingProfileId);
  //req.setDevice(device);
  console.log(device);
  networkServerService.createDevice({device: device}, (err, data) => {
        console.log(err);
        console.log(data);
  });
};

module.exports = {
      createDevice
};