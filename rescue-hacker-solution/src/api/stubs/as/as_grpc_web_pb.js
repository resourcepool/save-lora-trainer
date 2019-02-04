/**
 * @fileoverview gRPC-Web generated client stub for as
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');


var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js')

var common_common_pb = require('../common/common_pb.js')

var gw_gw_pb = require('../gw/gw_pb.js')
const proto = {};
proto.as = require('./as_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.as.ApplicationServerServiceClient =
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
proto.as.ApplicationServerServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!proto.as.ApplicationServerServiceClient} The delegate callback based client
   */
  this.delegateClient_ = new proto.as.ApplicationServerServiceClient(
      hostname, credentials, options);

};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.as.HandleUplinkDataRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodInfo_ApplicationServerService_HandleUplinkData = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_empty_pb.Empty,
  /** @param {!proto.as.HandleUplinkDataRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.as.HandleUplinkDataRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.as.ApplicationServerServiceClient.prototype.handleUplinkData =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/as.ApplicationServerService/HandleUplinkData',
      request,
      metadata,
      methodInfo_ApplicationServerService_HandleUplinkData,
      callback);
};


/**
 * @param {!proto.as.HandleUplinkDataRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     The XHR Node Readable Stream
 */
proto.as.ApplicationServerServicePromiseClient.prototype.handleUplinkData =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.handleUplinkData(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.as.HandleProprietaryUplinkRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodInfo_ApplicationServerService_HandleProprietaryUplink = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_empty_pb.Empty,
  /** @param {!proto.as.HandleProprietaryUplinkRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.as.HandleProprietaryUplinkRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.as.ApplicationServerServiceClient.prototype.handleProprietaryUplink =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/as.ApplicationServerService/HandleProprietaryUplink',
      request,
      metadata,
      methodInfo_ApplicationServerService_HandleProprietaryUplink,
      callback);
};


/**
 * @param {!proto.as.HandleProprietaryUplinkRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     The XHR Node Readable Stream
 */
proto.as.ApplicationServerServicePromiseClient.prototype.handleProprietaryUplink =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.handleProprietaryUplink(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.as.HandleErrorRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodInfo_ApplicationServerService_HandleError = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_empty_pb.Empty,
  /** @param {!proto.as.HandleErrorRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.as.HandleErrorRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.as.ApplicationServerServiceClient.prototype.handleError =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/as.ApplicationServerService/HandleError',
      request,
      metadata,
      methodInfo_ApplicationServerService_HandleError,
      callback);
};


/**
 * @param {!proto.as.HandleErrorRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     The XHR Node Readable Stream
 */
proto.as.ApplicationServerServicePromiseClient.prototype.handleError =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.handleError(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.as.HandleDownlinkACKRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodInfo_ApplicationServerService_HandleDownlinkACK = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_empty_pb.Empty,
  /** @param {!proto.as.HandleDownlinkACKRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.as.HandleDownlinkACKRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.as.ApplicationServerServiceClient.prototype.handleDownlinkACK =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/as.ApplicationServerService/HandleDownlinkACK',
      request,
      metadata,
      methodInfo_ApplicationServerService_HandleDownlinkACK,
      callback);
};


/**
 * @param {!proto.as.HandleDownlinkACKRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     The XHR Node Readable Stream
 */
proto.as.ApplicationServerServicePromiseClient.prototype.handleDownlinkACK =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.handleDownlinkACK(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.as.SetDeviceStatusRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodInfo_ApplicationServerService_SetDeviceStatus = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_empty_pb.Empty,
  /** @param {!proto.as.SetDeviceStatusRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.as.SetDeviceStatusRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.as.ApplicationServerServiceClient.prototype.setDeviceStatus =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/as.ApplicationServerService/SetDeviceStatus',
      request,
      metadata,
      methodInfo_ApplicationServerService_SetDeviceStatus,
      callback);
};


/**
 * @param {!proto.as.SetDeviceStatusRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     The XHR Node Readable Stream
 */
proto.as.ApplicationServerServicePromiseClient.prototype.setDeviceStatus =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.setDeviceStatus(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.as.SetDeviceLocationRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodInfo_ApplicationServerService_SetDeviceLocation = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_empty_pb.Empty,
  /** @param {!proto.as.SetDeviceLocationRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.as.SetDeviceLocationRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.as.ApplicationServerServiceClient.prototype.setDeviceLocation =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/as.ApplicationServerService/SetDeviceLocation',
      request,
      metadata,
      methodInfo_ApplicationServerService_SetDeviceLocation,
      callback);
};


/**
 * @param {!proto.as.SetDeviceLocationRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     The XHR Node Readable Stream
 */
proto.as.ApplicationServerServicePromiseClient.prototype.setDeviceLocation =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.setDeviceLocation(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


module.exports = proto.as;

