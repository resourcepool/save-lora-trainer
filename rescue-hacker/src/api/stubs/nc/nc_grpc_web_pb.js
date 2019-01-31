/**
 * @fileoverview gRPC-Web generated client stub for nc
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');


var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js')

var gw_gw_pb = require('../gw/gw_pb.js')
const proto = {};
proto.nc = require('./nc_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.nc.NetworkControllerServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

  /**
   * @private @const {?Object} The credentials to be used to connect
   *    to the server
   */
  this.credentials_ = credentials;

  /**
   * @private @const {?Object} Options for the client
   */
  this.options_ = options;
};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.nc.NetworkControllerServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!proto.nc.NetworkControllerServiceClient} The delegate callback based client
   */
  this.delegateClient_ = new proto.nc.NetworkControllerServiceClient(
      hostname, credentials, options);

};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.nc.HandleUplinkMetaDataRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodInfo_NetworkControllerService_HandleUplinkMetaData = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_empty_pb.Empty,
  /** @param {!proto.nc.HandleUplinkMetaDataRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.nc.HandleUplinkMetaDataRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.nc.NetworkControllerServiceClient.prototype.handleUplinkMetaData =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/nc.NetworkControllerService/HandleUplinkMetaData',
      request,
      metadata,
      methodInfo_NetworkControllerService_HandleUplinkMetaData,
      callback);
};


/**
 * @param {!proto.nc.HandleUplinkMetaDataRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     The XHR Node Readable Stream
 */
proto.nc.NetworkControllerServicePromiseClient.prototype.handleUplinkMetaData =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.handleUplinkMetaData(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.nc.HandleUplinkMACCommandRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodInfo_NetworkControllerService_HandleUplinkMACCommand = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_empty_pb.Empty,
  /** @param {!proto.nc.HandleUplinkMACCommandRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.nc.HandleUplinkMACCommandRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.nc.NetworkControllerServiceClient.prototype.handleUplinkMACCommand =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/nc.NetworkControllerService/HandleUplinkMACCommand',
      request,
      metadata,
      methodInfo_NetworkControllerService_HandleUplinkMACCommand,
      callback);
};


/**
 * @param {!proto.nc.HandleUplinkMACCommandRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     The XHR Node Readable Stream
 */
proto.nc.NetworkControllerServicePromiseClient.prototype.handleUplinkMACCommand =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.handleUplinkMACCommand(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


module.exports = proto.nc;

