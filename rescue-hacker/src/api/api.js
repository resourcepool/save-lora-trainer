const path = require("path");

const AUTH_HEADER = "Grpc-Metadata-Authorization";
const JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJsb3JhLWFwcC1zZXJ2ZXIiLCJhdWQiOiJsb3JhLWFwcC1zZXJ2ZXIiLCJuYmYiOjAsImV4cCI6MjE0NzQ4MzY0Nywic3ViIjoidXNlciIsInVzZXJuYW1lIjoicm9vdCJ9.GVAd8NMkAZ3axU2flBJ9PbNY_R45tbu-VLLaxWAGwWI";
const axios = require('axios');
const client = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {[AUTH_HEADER]: "Bearer " + JWT}
});
const createDevice = async (device) => {
  const response = await client.post('/devices', {device: device});
  console.log(device);
};

const setDeviceNwkKey = async (devEUI, nwkKey) => {
  const response = await client.post(`/devices/${devEUI}/keys`, {
    deviceKeys: {
      devEUI: devEUI,
      nwkKey: nwkKey
    }
  });
};

module.exports = {
  createDevice,
  setDeviceNwkKey
};