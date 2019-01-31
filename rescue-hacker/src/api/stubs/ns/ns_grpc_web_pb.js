/**
 * @fileoverview gRPC-Web generated client stub for ns
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');


var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js')

var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js')

var common_common_pb = require('../common/common_pb.js')

var gw_gw_pb = require('../gw/gw_pb.js')

var ns_profiles_pb = require('../ns/profiles_pb.js')
const proto = {};
proto.ns = require('./ns_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.ns.NetworkServerServiceClient =
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
proto.ns.NetworkServerServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!proto.ns.NetworkServerServiceClient} The delegate callback based client
   */
  this.delegateClient_ = new proto.ns.NetworkServerServiceClient(
      hostname, credentials, options);

};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.ns.CreateServiceProfileRequest,
 *   !proto.ns.CreateServiceProfileResponse>}
 */
const methodInfo_NetworkServerService_CreateServiceProfile = new grpc.web.AbstractClientBase.MethodInfo(
  proto.ns.CreateServiceProfileResponse,
  /** @param {!proto.ns.CreateServiceProfileRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.ns.CreateServiceProfileResponse.deserializeBinary
);


/**
 * @param {!proto.ns.CreateServiceProfileRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.ns.CreateServiceProfileResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.ns.CreateServiceProfileResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ns.NetworkServerServiceClient.prototype.createServiceProfile =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ns.NetworkServerService/CreateServiceProfile',
      request,
      metadata,
      methodInfo_NetworkServerService_CreateServiceProfile,
      callback);
};


/**
 * @param {!proto.ns.CreateServiceProfileRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.ns.CreateServiceProfileResponse>}
 *     The XHR Node Readable Stream
 */
proto.ns.NetworkServerServicePromiseClient.prototype.createServiceProfile =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.createServiceProfile(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.ns.GetServiceProfileRequest,
 *   !proto.ns.GetServiceProfileResponse>}
 */
const methodInfo_NetworkServerService_GetServiceProfile = new grpc.web.AbstractClientBase.MethodInfo(
  proto.ns.GetServiceProfileResponse,
  /** @param {!proto.ns.GetServiceProfileRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.ns.GetServiceProfileResponse.deserializeBinary
);


/**
 * @param {!proto.ns.GetServiceProfileRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.ns.GetServiceProfileResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.ns.GetServiceProfileResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ns.NetworkServerServiceClient.prototype.getServiceProfile =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ns.NetworkServerService/GetServiceProfile',
      request,
      metadata,
      methodInfo_NetworkServerService_GetServiceProfile,
      callback);
};


/**
 * @param {!proto.ns.GetServiceProfileRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.ns.GetServiceProfileResponse>}
 *     The XHR Node Readable Stream
 */
proto.ns.NetworkServerServicePromiseClient.prototype.getServiceProfile =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.getServiceProfile(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.ns.UpdateServiceProfileRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodInfo_NetworkServerService_UpdateServiceProfile = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_empty_pb.Empty,
  /** @param {!proto.ns.UpdateServiceProfileRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.ns.UpdateServiceProfileRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ns.NetworkServerServiceClient.prototype.updateServiceProfile =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ns.NetworkServerService/UpdateServiceProfile',
      request,
      metadata,
      methodInfo_NetworkServerService_UpdateServiceProfile,
      callback);
};


/**
 * @param {!proto.ns.UpdateServiceProfileRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     The XHR Node Readable Stream
 */
proto.ns.NetworkServerServicePromiseClient.prototype.updateServiceProfile =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.updateServiceProfile(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.ns.DeleteServiceProfileRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodInfo_NetworkServerService_DeleteServiceProfile = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_empty_pb.Empty,
  /** @param {!proto.ns.DeleteServiceProfileRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.ns.DeleteServiceProfileRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ns.NetworkServerServiceClient.prototype.deleteServiceProfile =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ns.NetworkServerService/DeleteServiceProfile',
      request,
      metadata,
      methodInfo_NetworkServerService_DeleteServiceProfile,
      callback);
};


/**
 * @param {!proto.ns.DeleteServiceProfileRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     The XHR Node Readable Stream
 */
proto.ns.NetworkServerServicePromiseClient.prototype.deleteServiceProfile =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.deleteServiceProfile(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.ns.CreateRoutingProfileRequest,
 *   !proto.ns.CreateRoutingProfileResponse>}
 */
const methodInfo_NetworkServerService_CreateRoutingProfile = new grpc.web.AbstractClientBase.MethodInfo(
  proto.ns.CreateRoutingProfileResponse,
  /** @param {!proto.ns.CreateRoutingProfileRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.ns.CreateRoutingProfileResponse.deserializeBinary
);


/**
 * @param {!proto.ns.CreateRoutingProfileRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.ns.CreateRoutingProfileResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.ns.CreateRoutingProfileResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ns.NetworkServerServiceClient.prototype.createRoutingProfile =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ns.NetworkServerService/CreateRoutingProfile',
      request,
      metadata,
      methodInfo_NetworkServerService_CreateRoutingProfile,
      callback);
};


/**
 * @param {!proto.ns.CreateRoutingProfileRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.ns.CreateRoutingProfileResponse>}
 *     The XHR Node Readable Stream
 */
proto.ns.NetworkServerServicePromiseClient.prototype.createRoutingProfile =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.createRoutingProfile(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.ns.GetRoutingProfileRequest,
 *   !proto.ns.GetRoutingProfileResponse>}
 */
const methodInfo_NetworkServerService_GetRoutingProfile = new grpc.web.AbstractClientBase.MethodInfo(
  proto.ns.GetRoutingProfileResponse,
  /** @param {!proto.ns.GetRoutingProfileRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.ns.GetRoutingProfileResponse.deserializeBinary
);


/**
 * @param {!proto.ns.GetRoutingProfileRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.ns.GetRoutingProfileResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.ns.GetRoutingProfileResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ns.NetworkServerServiceClient.prototype.getRoutingProfile =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ns.NetworkServerService/GetRoutingProfile',
      request,
      metadata,
      methodInfo_NetworkServerService_GetRoutingProfile,
      callback);
};


/**
 * @param {!proto.ns.GetRoutingProfileRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.ns.GetRoutingProfileResponse>}
 *     The XHR Node Readable Stream
 */
proto.ns.NetworkServerServicePromiseClient.prototype.getRoutingProfile =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.getRoutingProfile(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.ns.UpdateRoutingProfileRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodInfo_NetworkServerService_UpdateRoutingProfile = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_empty_pb.Empty,
  /** @param {!proto.ns.UpdateRoutingProfileRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.ns.UpdateRoutingProfileRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ns.NetworkServerServiceClient.prototype.updateRoutingProfile =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ns.NetworkServerService/UpdateRoutingProfile',
      request,
      metadata,
      methodInfo_NetworkServerService_UpdateRoutingProfile,
      callback);
};


/**
 * @param {!proto.ns.UpdateRoutingProfileRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     The XHR Node Readable Stream
 */
proto.ns.NetworkServerServicePromiseClient.prototype.updateRoutingProfile =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.updateRoutingProfile(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.ns.DeleteRoutingProfileRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodInfo_NetworkServerService_DeleteRoutingProfile = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_empty_pb.Empty,
  /** @param {!proto.ns.DeleteRoutingProfileRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.ns.DeleteRoutingProfileRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ns.NetworkServerServiceClient.prototype.deleteRoutingProfile =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ns.NetworkServerService/DeleteRoutingProfile',
      request,
      metadata,
      methodInfo_NetworkServerService_DeleteRoutingProfile,
      callback);
};


/**
 * @param {!proto.ns.DeleteRoutingProfileRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     The XHR Node Readable Stream
 */
proto.ns.NetworkServerServicePromiseClient.prototype.deleteRoutingProfile =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.deleteRoutingProfile(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.ns.CreateDeviceProfileRequest,
 *   !proto.ns.CreateDeviceProfileResponse>}
 */
const methodInfo_NetworkServerService_CreateDeviceProfile = new grpc.web.AbstractClientBase.MethodInfo(
  proto.ns.CreateDeviceProfileResponse,
  /** @param {!proto.ns.CreateDeviceProfileRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.ns.CreateDeviceProfileResponse.deserializeBinary
);


/**
 * @param {!proto.ns.CreateDeviceProfileRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.ns.CreateDeviceProfileResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.ns.CreateDeviceProfileResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ns.NetworkServerServiceClient.prototype.createDeviceProfile =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ns.NetworkServerService/CreateDeviceProfile',
      request,
      metadata,
      methodInfo_NetworkServerService_CreateDeviceProfile,
      callback);
};


/**
 * @param {!proto.ns.CreateDeviceProfileRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.ns.CreateDeviceProfileResponse>}
 *     The XHR Node Readable Stream
 */
proto.ns.NetworkServerServicePromiseClient.prototype.createDeviceProfile =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.createDeviceProfile(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.ns.GetDeviceProfileRequest,
 *   !proto.ns.GetDeviceProfileResponse>}
 */
const methodInfo_NetworkServerService_GetDeviceProfile = new grpc.web.AbstractClientBase.MethodInfo(
  proto.ns.GetDeviceProfileResponse,
  /** @param {!proto.ns.GetDeviceProfileRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.ns.GetDeviceProfileResponse.deserializeBinary
);


/**
 * @param {!proto.ns.GetDeviceProfileRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.ns.GetDeviceProfileResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.ns.GetDeviceProfileResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ns.NetworkServerServiceClient.prototype.getDeviceProfile =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ns.NetworkServerService/GetDeviceProfile',
      request,
      metadata,
      methodInfo_NetworkServerService_GetDeviceProfile,
      callback);
};


/**
 * @param {!proto.ns.GetDeviceProfileRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.ns.GetDeviceProfileResponse>}
 *     The XHR Node Readable Stream
 */
proto.ns.NetworkServerServicePromiseClient.prototype.getDeviceProfile =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.getDeviceProfile(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.ns.UpdateDeviceProfileRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodInfo_NetworkServerService_UpdateDeviceProfile = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_empty_pb.Empty,
  /** @param {!proto.ns.UpdateDeviceProfileRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.ns.UpdateDeviceProfileRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ns.NetworkServerServiceClient.prototype.updateDeviceProfile =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ns.NetworkServerService/UpdateDeviceProfile',
      request,
      metadata,
      methodInfo_NetworkServerService_UpdateDeviceProfile,
      callback);
};


/**
 * @param {!proto.ns.UpdateDeviceProfileRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     The XHR Node Readable Stream
 */
proto.ns.NetworkServerServicePromiseClient.prototype.updateDeviceProfile =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.updateDeviceProfile(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.ns.DeleteDeviceProfileRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodInfo_NetworkServerService_DeleteDeviceProfile = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_empty_pb.Empty,
  /** @param {!proto.ns.DeleteDeviceProfileRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.ns.DeleteDeviceProfileRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ns.NetworkServerServiceClient.prototype.deleteDeviceProfile =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ns.NetworkServerService/DeleteDeviceProfile',
      request,
      metadata,
      methodInfo_NetworkServerService_DeleteDeviceProfile,
      callback);
};


/**
 * @param {!proto.ns.DeleteDeviceProfileRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     The XHR Node Readable Stream
 */
proto.ns.NetworkServerServicePromiseClient.prototype.deleteDeviceProfile =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.deleteDeviceProfile(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.ns.CreateDeviceRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodInfo_NetworkServerService_CreateDevice = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_empty_pb.Empty,
  /** @param {!proto.ns.CreateDeviceRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.ns.CreateDeviceRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ns.NetworkServerServiceClient.prototype.createDevice =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ns.NetworkServerService/CreateDevice',
      request,
      metadata,
      methodInfo_NetworkServerService_CreateDevice,
      callback);
};


/**
 * @param {!proto.ns.CreateDeviceRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     The XHR Node Readable Stream
 */
proto.ns.NetworkServerServicePromiseClient.prototype.createDevice =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.createDevice(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.ns.GetDeviceRequest,
 *   !proto.ns.GetDeviceResponse>}
 */
const methodInfo_NetworkServerService_GetDevice = new grpc.web.AbstractClientBase.MethodInfo(
  proto.ns.GetDeviceResponse,
  /** @param {!proto.ns.GetDeviceRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.ns.GetDeviceResponse.deserializeBinary
);


/**
 * @param {!proto.ns.GetDeviceRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.ns.GetDeviceResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.ns.GetDeviceResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ns.NetworkServerServiceClient.prototype.getDevice =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ns.NetworkServerService/GetDevice',
      request,
      metadata,
      methodInfo_NetworkServerService_GetDevice,
      callback);
};


/**
 * @param {!proto.ns.GetDeviceRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.ns.GetDeviceResponse>}
 *     The XHR Node Readable Stream
 */
proto.ns.NetworkServerServicePromiseClient.prototype.getDevice =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.getDevice(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.ns.UpdateDeviceRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodInfo_NetworkServerService_UpdateDevice = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_empty_pb.Empty,
  /** @param {!proto.ns.UpdateDeviceRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.ns.UpdateDeviceRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ns.NetworkServerServiceClient.prototype.updateDevice =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ns.NetworkServerService/UpdateDevice',
      request,
      metadata,
      methodInfo_NetworkServerService_UpdateDevice,
      callback);
};


/**
 * @param {!proto.ns.UpdateDeviceRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     The XHR Node Readable Stream
 */
proto.ns.NetworkServerServicePromiseClient.prototype.updateDevice =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.updateDevice(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.ns.DeleteDeviceRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodInfo_NetworkServerService_DeleteDevice = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_empty_pb.Empty,
  /** @param {!proto.ns.DeleteDeviceRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.ns.DeleteDeviceRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ns.NetworkServerServiceClient.prototype.deleteDevice =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ns.NetworkServerService/DeleteDevice',
      request,
      metadata,
      methodInfo_NetworkServerService_DeleteDevice,
      callback);
};


/**
 * @param {!proto.ns.DeleteDeviceRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     The XHR Node Readable Stream
 */
proto.ns.NetworkServerServicePromiseClient.prototype.deleteDevice =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.deleteDevice(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.ns.ActivateDeviceRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodInfo_NetworkServerService_ActivateDevice = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_empty_pb.Empty,
  /** @param {!proto.ns.ActivateDeviceRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.ns.ActivateDeviceRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ns.NetworkServerServiceClient.prototype.activateDevice =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ns.NetworkServerService/ActivateDevice',
      request,
      metadata,
      methodInfo_NetworkServerService_ActivateDevice,
      callback);
};


/**
 * @param {!proto.ns.ActivateDeviceRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     The XHR Node Readable Stream
 */
proto.ns.NetworkServerServicePromiseClient.prototype.activateDevice =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.activateDevice(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.ns.DeactivateDeviceRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodInfo_NetworkServerService_DeactivateDevice = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_empty_pb.Empty,
  /** @param {!proto.ns.DeactivateDeviceRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.ns.DeactivateDeviceRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ns.NetworkServerServiceClient.prototype.deactivateDevice =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ns.NetworkServerService/DeactivateDevice',
      request,
      metadata,
      methodInfo_NetworkServerService_DeactivateDevice,
      callback);
};


/**
 * @param {!proto.ns.DeactivateDeviceRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     The XHR Node Readable Stream
 */
proto.ns.NetworkServerServicePromiseClient.prototype.deactivateDevice =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.deactivateDevice(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.ns.GetDeviceActivationRequest,
 *   !proto.ns.GetDeviceActivationResponse>}
 */
const methodInfo_NetworkServerService_GetDeviceActivation = new grpc.web.AbstractClientBase.MethodInfo(
  proto.ns.GetDeviceActivationResponse,
  /** @param {!proto.ns.GetDeviceActivationRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.ns.GetDeviceActivationResponse.deserializeBinary
);


/**
 * @param {!proto.ns.GetDeviceActivationRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.ns.GetDeviceActivationResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.ns.GetDeviceActivationResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ns.NetworkServerServiceClient.prototype.getDeviceActivation =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ns.NetworkServerService/GetDeviceActivation',
      request,
      metadata,
      methodInfo_NetworkServerService_GetDeviceActivation,
      callback);
};


/**
 * @param {!proto.ns.GetDeviceActivationRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.ns.GetDeviceActivationResponse>}
 *     The XHR Node Readable Stream
 */
proto.ns.NetworkServerServicePromiseClient.prototype.getDeviceActivation =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.getDeviceActivation(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.ns.CreateDeviceQueueItemRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodInfo_NetworkServerService_CreateDeviceQueueItem = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_empty_pb.Empty,
  /** @param {!proto.ns.CreateDeviceQueueItemRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.ns.CreateDeviceQueueItemRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ns.NetworkServerServiceClient.prototype.createDeviceQueueItem =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ns.NetworkServerService/CreateDeviceQueueItem',
      request,
      metadata,
      methodInfo_NetworkServerService_CreateDeviceQueueItem,
      callback);
};


/**
 * @param {!proto.ns.CreateDeviceQueueItemRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     The XHR Node Readable Stream
 */
proto.ns.NetworkServerServicePromiseClient.prototype.createDeviceQueueItem =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.createDeviceQueueItem(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.ns.FlushDeviceQueueForDevEUIRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodInfo_NetworkServerService_FlushDeviceQueueForDevEUI = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_empty_pb.Empty,
  /** @param {!proto.ns.FlushDeviceQueueForDevEUIRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.ns.FlushDeviceQueueForDevEUIRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ns.NetworkServerServiceClient.prototype.flushDeviceQueueForDevEUI =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ns.NetworkServerService/FlushDeviceQueueForDevEUI',
      request,
      metadata,
      methodInfo_NetworkServerService_FlushDeviceQueueForDevEUI,
      callback);
};


/**
 * @param {!proto.ns.FlushDeviceQueueForDevEUIRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     The XHR Node Readable Stream
 */
proto.ns.NetworkServerServicePromiseClient.prototype.flushDeviceQueueForDevEUI =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.flushDeviceQueueForDevEUI(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.ns.GetDeviceQueueItemsForDevEUIRequest,
 *   !proto.ns.GetDeviceQueueItemsForDevEUIResponse>}
 */
const methodInfo_NetworkServerService_GetDeviceQueueItemsForDevEUI = new grpc.web.AbstractClientBase.MethodInfo(
  proto.ns.GetDeviceQueueItemsForDevEUIResponse,
  /** @param {!proto.ns.GetDeviceQueueItemsForDevEUIRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.ns.GetDeviceQueueItemsForDevEUIResponse.deserializeBinary
);


/**
 * @param {!proto.ns.GetDeviceQueueItemsForDevEUIRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.ns.GetDeviceQueueItemsForDevEUIResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.ns.GetDeviceQueueItemsForDevEUIResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ns.NetworkServerServiceClient.prototype.getDeviceQueueItemsForDevEUI =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ns.NetworkServerService/GetDeviceQueueItemsForDevEUI',
      request,
      metadata,
      methodInfo_NetworkServerService_GetDeviceQueueItemsForDevEUI,
      callback);
};


/**
 * @param {!proto.ns.GetDeviceQueueItemsForDevEUIRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.ns.GetDeviceQueueItemsForDevEUIResponse>}
 *     The XHR Node Readable Stream
 */
proto.ns.NetworkServerServicePromiseClient.prototype.getDeviceQueueItemsForDevEUI =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.getDeviceQueueItemsForDevEUI(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.ns.GetNextDownlinkFCntForDevEUIRequest,
 *   !proto.ns.GetNextDownlinkFCntForDevEUIResponse>}
 */
const methodInfo_NetworkServerService_GetNextDownlinkFCntForDevEUI = new grpc.web.AbstractClientBase.MethodInfo(
  proto.ns.GetNextDownlinkFCntForDevEUIResponse,
  /** @param {!proto.ns.GetNextDownlinkFCntForDevEUIRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.ns.GetNextDownlinkFCntForDevEUIResponse.deserializeBinary
);


/**
 * @param {!proto.ns.GetNextDownlinkFCntForDevEUIRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.ns.GetNextDownlinkFCntForDevEUIResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.ns.GetNextDownlinkFCntForDevEUIResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ns.NetworkServerServiceClient.prototype.getNextDownlinkFCntForDevEUI =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ns.NetworkServerService/GetNextDownlinkFCntForDevEUI',
      request,
      metadata,
      methodInfo_NetworkServerService_GetNextDownlinkFCntForDevEUI,
      callback);
};


/**
 * @param {!proto.ns.GetNextDownlinkFCntForDevEUIRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.ns.GetNextDownlinkFCntForDevEUIResponse>}
 *     The XHR Node Readable Stream
 */
proto.ns.NetworkServerServicePromiseClient.prototype.getNextDownlinkFCntForDevEUI =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.getNextDownlinkFCntForDevEUI(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.google.protobuf.Empty,
 *   !proto.ns.GetRandomDevAddrResponse>}
 */
const methodInfo_NetworkServerService_GetRandomDevAddr = new grpc.web.AbstractClientBase.MethodInfo(
  proto.ns.GetRandomDevAddrResponse,
  /** @param {!proto.google.protobuf.Empty} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.ns.GetRandomDevAddrResponse.deserializeBinary
);


/**
 * @param {!proto.google.protobuf.Empty} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.ns.GetRandomDevAddrResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.ns.GetRandomDevAddrResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ns.NetworkServerServiceClient.prototype.getRandomDevAddr =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ns.NetworkServerService/GetRandomDevAddr',
      request,
      metadata,
      methodInfo_NetworkServerService_GetRandomDevAddr,
      callback);
};


/**
 * @param {!proto.google.protobuf.Empty} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.ns.GetRandomDevAddrResponse>}
 *     The XHR Node Readable Stream
 */
proto.ns.NetworkServerServicePromiseClient.prototype.getRandomDevAddr =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.getRandomDevAddr(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.ns.CreateMACCommandQueueItemRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodInfo_NetworkServerService_CreateMACCommandQueueItem = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_empty_pb.Empty,
  /** @param {!proto.ns.CreateMACCommandQueueItemRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.ns.CreateMACCommandQueueItemRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ns.NetworkServerServiceClient.prototype.createMACCommandQueueItem =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ns.NetworkServerService/CreateMACCommandQueueItem',
      request,
      metadata,
      methodInfo_NetworkServerService_CreateMACCommandQueueItem,
      callback);
};


/**
 * @param {!proto.ns.CreateMACCommandQueueItemRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     The XHR Node Readable Stream
 */
proto.ns.NetworkServerServicePromiseClient.prototype.createMACCommandQueueItem =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.createMACCommandQueueItem(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.ns.SendProprietaryPayloadRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodInfo_NetworkServerService_SendProprietaryPayload = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_empty_pb.Empty,
  /** @param {!proto.ns.SendProprietaryPayloadRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.ns.SendProprietaryPayloadRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ns.NetworkServerServiceClient.prototype.sendProprietaryPayload =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ns.NetworkServerService/SendProprietaryPayload',
      request,
      metadata,
      methodInfo_NetworkServerService_SendProprietaryPayload,
      callback);
};


/**
 * @param {!proto.ns.SendProprietaryPayloadRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     The XHR Node Readable Stream
 */
proto.ns.NetworkServerServicePromiseClient.prototype.sendProprietaryPayload =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.sendProprietaryPayload(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.ns.CreateGatewayRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodInfo_NetworkServerService_CreateGateway = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_empty_pb.Empty,
  /** @param {!proto.ns.CreateGatewayRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.ns.CreateGatewayRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ns.NetworkServerServiceClient.prototype.createGateway =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ns.NetworkServerService/CreateGateway',
      request,
      metadata,
      methodInfo_NetworkServerService_CreateGateway,
      callback);
};


/**
 * @param {!proto.ns.CreateGatewayRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     The XHR Node Readable Stream
 */
proto.ns.NetworkServerServicePromiseClient.prototype.createGateway =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.createGateway(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.ns.GetGatewayRequest,
 *   !proto.ns.GetGatewayResponse>}
 */
const methodInfo_NetworkServerService_GetGateway = new grpc.web.AbstractClientBase.MethodInfo(
  proto.ns.GetGatewayResponse,
  /** @param {!proto.ns.GetGatewayRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.ns.GetGatewayResponse.deserializeBinary
);


/**
 * @param {!proto.ns.GetGatewayRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.ns.GetGatewayResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.ns.GetGatewayResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ns.NetworkServerServiceClient.prototype.getGateway =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ns.NetworkServerService/GetGateway',
      request,
      metadata,
      methodInfo_NetworkServerService_GetGateway,
      callback);
};


/**
 * @param {!proto.ns.GetGatewayRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.ns.GetGatewayResponse>}
 *     The XHR Node Readable Stream
 */
proto.ns.NetworkServerServicePromiseClient.prototype.getGateway =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.getGateway(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.ns.UpdateGatewayRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodInfo_NetworkServerService_UpdateGateway = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_empty_pb.Empty,
  /** @param {!proto.ns.UpdateGatewayRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.ns.UpdateGatewayRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ns.NetworkServerServiceClient.prototype.updateGateway =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ns.NetworkServerService/UpdateGateway',
      request,
      metadata,
      methodInfo_NetworkServerService_UpdateGateway,
      callback);
};


/**
 * @param {!proto.ns.UpdateGatewayRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     The XHR Node Readable Stream
 */
proto.ns.NetworkServerServicePromiseClient.prototype.updateGateway =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.updateGateway(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.ns.DeleteGatewayRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodInfo_NetworkServerService_DeleteGateway = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_empty_pb.Empty,
  /** @param {!proto.ns.DeleteGatewayRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.ns.DeleteGatewayRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ns.NetworkServerServiceClient.prototype.deleteGateway =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ns.NetworkServerService/DeleteGateway',
      request,
      metadata,
      methodInfo_NetworkServerService_DeleteGateway,
      callback);
};


/**
 * @param {!proto.ns.DeleteGatewayRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     The XHR Node Readable Stream
 */
proto.ns.NetworkServerServicePromiseClient.prototype.deleteGateway =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.deleteGateway(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.ns.CreateGatewayProfileRequest,
 *   !proto.ns.CreateGatewayProfileResponse>}
 */
const methodInfo_NetworkServerService_CreateGatewayProfile = new grpc.web.AbstractClientBase.MethodInfo(
  proto.ns.CreateGatewayProfileResponse,
  /** @param {!proto.ns.CreateGatewayProfileRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.ns.CreateGatewayProfileResponse.deserializeBinary
);


/**
 * @param {!proto.ns.CreateGatewayProfileRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.ns.CreateGatewayProfileResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.ns.CreateGatewayProfileResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ns.NetworkServerServiceClient.prototype.createGatewayProfile =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ns.NetworkServerService/CreateGatewayProfile',
      request,
      metadata,
      methodInfo_NetworkServerService_CreateGatewayProfile,
      callback);
};


/**
 * @param {!proto.ns.CreateGatewayProfileRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.ns.CreateGatewayProfileResponse>}
 *     The XHR Node Readable Stream
 */
proto.ns.NetworkServerServicePromiseClient.prototype.createGatewayProfile =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.createGatewayProfile(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.ns.GetGatewayProfileRequest,
 *   !proto.ns.GetGatewayProfileResponse>}
 */
const methodInfo_NetworkServerService_GetGatewayProfile = new grpc.web.AbstractClientBase.MethodInfo(
  proto.ns.GetGatewayProfileResponse,
  /** @param {!proto.ns.GetGatewayProfileRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.ns.GetGatewayProfileResponse.deserializeBinary
);


/**
 * @param {!proto.ns.GetGatewayProfileRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.ns.GetGatewayProfileResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.ns.GetGatewayProfileResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ns.NetworkServerServiceClient.prototype.getGatewayProfile =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ns.NetworkServerService/GetGatewayProfile',
      request,
      metadata,
      methodInfo_NetworkServerService_GetGatewayProfile,
      callback);
};


/**
 * @param {!proto.ns.GetGatewayProfileRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.ns.GetGatewayProfileResponse>}
 *     The XHR Node Readable Stream
 */
proto.ns.NetworkServerServicePromiseClient.prototype.getGatewayProfile =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.getGatewayProfile(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.ns.UpdateGatewayProfileRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodInfo_NetworkServerService_UpdateGatewayProfile = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_empty_pb.Empty,
  /** @param {!proto.ns.UpdateGatewayProfileRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.ns.UpdateGatewayProfileRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ns.NetworkServerServiceClient.prototype.updateGatewayProfile =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ns.NetworkServerService/UpdateGatewayProfile',
      request,
      metadata,
      methodInfo_NetworkServerService_UpdateGatewayProfile,
      callback);
};


/**
 * @param {!proto.ns.UpdateGatewayProfileRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     The XHR Node Readable Stream
 */
proto.ns.NetworkServerServicePromiseClient.prototype.updateGatewayProfile =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.updateGatewayProfile(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.ns.DeleteGatewayProfileRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodInfo_NetworkServerService_DeleteGatewayProfile = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_empty_pb.Empty,
  /** @param {!proto.ns.DeleteGatewayProfileRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.ns.DeleteGatewayProfileRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ns.NetworkServerServiceClient.prototype.deleteGatewayProfile =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ns.NetworkServerService/DeleteGatewayProfile',
      request,
      metadata,
      methodInfo_NetworkServerService_DeleteGatewayProfile,
      callback);
};


/**
 * @param {!proto.ns.DeleteGatewayProfileRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     The XHR Node Readable Stream
 */
proto.ns.NetworkServerServicePromiseClient.prototype.deleteGatewayProfile =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.deleteGatewayProfile(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.ns.GetGatewayStatsRequest,
 *   !proto.ns.GetGatewayStatsResponse>}
 */
const methodInfo_NetworkServerService_GetGatewayStats = new grpc.web.AbstractClientBase.MethodInfo(
  proto.ns.GetGatewayStatsResponse,
  /** @param {!proto.ns.GetGatewayStatsRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.ns.GetGatewayStatsResponse.deserializeBinary
);


/**
 * @param {!proto.ns.GetGatewayStatsRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.ns.GetGatewayStatsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.ns.GetGatewayStatsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ns.NetworkServerServiceClient.prototype.getGatewayStats =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ns.NetworkServerService/GetGatewayStats',
      request,
      metadata,
      methodInfo_NetworkServerService_GetGatewayStats,
      callback);
};


/**
 * @param {!proto.ns.GetGatewayStatsRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.ns.GetGatewayStatsResponse>}
 *     The XHR Node Readable Stream
 */
proto.ns.NetworkServerServicePromiseClient.prototype.getGatewayStats =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.getGatewayStats(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.ns.StreamFrameLogsForGatewayRequest,
 *   !proto.ns.StreamFrameLogsForGatewayResponse>}
 */
const methodInfo_NetworkServerService_StreamFrameLogsForGateway = new grpc.web.AbstractClientBase.MethodInfo(
  proto.ns.StreamFrameLogsForGatewayResponse,
  /** @param {!proto.ns.StreamFrameLogsForGatewayRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.ns.StreamFrameLogsForGatewayResponse.deserializeBinary
);


/**
 * @param {!proto.ns.StreamFrameLogsForGatewayRequest} request The request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.ns.StreamFrameLogsForGatewayResponse>}
 *     The XHR Node Readable Stream
 */
proto.ns.NetworkServerServiceClient.prototype.streamFrameLogsForGateway =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/ns.NetworkServerService/StreamFrameLogsForGateway',
      request,
      metadata,
      methodInfo_NetworkServerService_StreamFrameLogsForGateway);
};


/**
 * @param {!proto.ns.StreamFrameLogsForGatewayRequest} request The request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.ns.StreamFrameLogsForGatewayResponse>}
 *     The XHR Node Readable Stream
 */
proto.ns.NetworkServerServicePromiseClient.prototype.streamFrameLogsForGateway =
    function(request, metadata) {
  return this.delegateClient_.client_.serverStreaming(this.delegateClient_.hostname_ +
      '/ns.NetworkServerService/StreamFrameLogsForGateway',
      request,
      metadata,
      methodInfo_NetworkServerService_StreamFrameLogsForGateway);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.ns.StreamFrameLogsForDeviceRequest,
 *   !proto.ns.StreamFrameLogsForDeviceResponse>}
 */
const methodInfo_NetworkServerService_StreamFrameLogsForDevice = new grpc.web.AbstractClientBase.MethodInfo(
  proto.ns.StreamFrameLogsForDeviceResponse,
  /** @param {!proto.ns.StreamFrameLogsForDeviceRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.ns.StreamFrameLogsForDeviceResponse.deserializeBinary
);


/**
 * @param {!proto.ns.StreamFrameLogsForDeviceRequest} request The request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.ns.StreamFrameLogsForDeviceResponse>}
 *     The XHR Node Readable Stream
 */
proto.ns.NetworkServerServiceClient.prototype.streamFrameLogsForDevice =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/ns.NetworkServerService/StreamFrameLogsForDevice',
      request,
      metadata,
      methodInfo_NetworkServerService_StreamFrameLogsForDevice);
};


/**
 * @param {!proto.ns.StreamFrameLogsForDeviceRequest} request The request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.ns.StreamFrameLogsForDeviceResponse>}
 *     The XHR Node Readable Stream
 */
proto.ns.NetworkServerServicePromiseClient.prototype.streamFrameLogsForDevice =
    function(request, metadata) {
  return this.delegateClient_.client_.serverStreaming(this.delegateClient_.hostname_ +
      '/ns.NetworkServerService/StreamFrameLogsForDevice',
      request,
      metadata,
      methodInfo_NetworkServerService_StreamFrameLogsForDevice);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.ns.CreateMulticastGroupRequest,
 *   !proto.ns.CreateMulticastGroupResponse>}
 */
const methodInfo_NetworkServerService_CreateMulticastGroup = new grpc.web.AbstractClientBase.MethodInfo(
  proto.ns.CreateMulticastGroupResponse,
  /** @param {!proto.ns.CreateMulticastGroupRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.ns.CreateMulticastGroupResponse.deserializeBinary
);


/**
 * @param {!proto.ns.CreateMulticastGroupRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.ns.CreateMulticastGroupResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.ns.CreateMulticastGroupResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ns.NetworkServerServiceClient.prototype.createMulticastGroup =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ns.NetworkServerService/CreateMulticastGroup',
      request,
      metadata,
      methodInfo_NetworkServerService_CreateMulticastGroup,
      callback);
};


/**
 * @param {!proto.ns.CreateMulticastGroupRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.ns.CreateMulticastGroupResponse>}
 *     The XHR Node Readable Stream
 */
proto.ns.NetworkServerServicePromiseClient.prototype.createMulticastGroup =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.createMulticastGroup(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.ns.GetMulticastGroupRequest,
 *   !proto.ns.GetMulticastGroupResponse>}
 */
const methodInfo_NetworkServerService_GetMulticastGroup = new grpc.web.AbstractClientBase.MethodInfo(
  proto.ns.GetMulticastGroupResponse,
  /** @param {!proto.ns.GetMulticastGroupRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.ns.GetMulticastGroupResponse.deserializeBinary
);


/**
 * @param {!proto.ns.GetMulticastGroupRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.ns.GetMulticastGroupResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.ns.GetMulticastGroupResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ns.NetworkServerServiceClient.prototype.getMulticastGroup =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ns.NetworkServerService/GetMulticastGroup',
      request,
      metadata,
      methodInfo_NetworkServerService_GetMulticastGroup,
      callback);
};


/**
 * @param {!proto.ns.GetMulticastGroupRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.ns.GetMulticastGroupResponse>}
 *     The XHR Node Readable Stream
 */
proto.ns.NetworkServerServicePromiseClient.prototype.getMulticastGroup =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.getMulticastGroup(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.ns.UpdateMulticastGroupRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodInfo_NetworkServerService_UpdateMulticastGroup = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_empty_pb.Empty,
  /** @param {!proto.ns.UpdateMulticastGroupRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.ns.UpdateMulticastGroupRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ns.NetworkServerServiceClient.prototype.updateMulticastGroup =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ns.NetworkServerService/UpdateMulticastGroup',
      request,
      metadata,
      methodInfo_NetworkServerService_UpdateMulticastGroup,
      callback);
};


/**
 * @param {!proto.ns.UpdateMulticastGroupRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     The XHR Node Readable Stream
 */
proto.ns.NetworkServerServicePromiseClient.prototype.updateMulticastGroup =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.updateMulticastGroup(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.ns.DeleteMulticastGroupRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodInfo_NetworkServerService_DeleteMulticastGroup = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_empty_pb.Empty,
  /** @param {!proto.ns.DeleteMulticastGroupRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.ns.DeleteMulticastGroupRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ns.NetworkServerServiceClient.prototype.deleteMulticastGroup =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ns.NetworkServerService/DeleteMulticastGroup',
      request,
      metadata,
      methodInfo_NetworkServerService_DeleteMulticastGroup,
      callback);
};


/**
 * @param {!proto.ns.DeleteMulticastGroupRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     The XHR Node Readable Stream
 */
proto.ns.NetworkServerServicePromiseClient.prototype.deleteMulticastGroup =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.deleteMulticastGroup(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.ns.AddDeviceToMulticastGroupRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodInfo_NetworkServerService_AddDeviceToMulticastGroup = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_empty_pb.Empty,
  /** @param {!proto.ns.AddDeviceToMulticastGroupRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.ns.AddDeviceToMulticastGroupRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ns.NetworkServerServiceClient.prototype.addDeviceToMulticastGroup =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ns.NetworkServerService/AddDeviceToMulticastGroup',
      request,
      metadata,
      methodInfo_NetworkServerService_AddDeviceToMulticastGroup,
      callback);
};


/**
 * @param {!proto.ns.AddDeviceToMulticastGroupRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     The XHR Node Readable Stream
 */
proto.ns.NetworkServerServicePromiseClient.prototype.addDeviceToMulticastGroup =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.addDeviceToMulticastGroup(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.ns.RemoveDeviceFromMulticastGroupRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodInfo_NetworkServerService_RemoveDeviceFromMulticastGroup = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_empty_pb.Empty,
  /** @param {!proto.ns.RemoveDeviceFromMulticastGroupRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.ns.RemoveDeviceFromMulticastGroupRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ns.NetworkServerServiceClient.prototype.removeDeviceFromMulticastGroup =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ns.NetworkServerService/RemoveDeviceFromMulticastGroup',
      request,
      metadata,
      methodInfo_NetworkServerService_RemoveDeviceFromMulticastGroup,
      callback);
};


/**
 * @param {!proto.ns.RemoveDeviceFromMulticastGroupRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     The XHR Node Readable Stream
 */
proto.ns.NetworkServerServicePromiseClient.prototype.removeDeviceFromMulticastGroup =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.removeDeviceFromMulticastGroup(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.ns.EnqueueMulticastQueueItemRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodInfo_NetworkServerService_EnqueueMulticastQueueItem = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_empty_pb.Empty,
  /** @param {!proto.ns.EnqueueMulticastQueueItemRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.ns.EnqueueMulticastQueueItemRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ns.NetworkServerServiceClient.prototype.enqueueMulticastQueueItem =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ns.NetworkServerService/EnqueueMulticastQueueItem',
      request,
      metadata,
      methodInfo_NetworkServerService_EnqueueMulticastQueueItem,
      callback);
};


/**
 * @param {!proto.ns.EnqueueMulticastQueueItemRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     The XHR Node Readable Stream
 */
proto.ns.NetworkServerServicePromiseClient.prototype.enqueueMulticastQueueItem =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.enqueueMulticastQueueItem(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.ns.FlushMulticastQueueForMulticastGroupRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodInfo_NetworkServerService_FlushMulticastQueueForMulticastGroup = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_empty_pb.Empty,
  /** @param {!proto.ns.FlushMulticastQueueForMulticastGroupRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.ns.FlushMulticastQueueForMulticastGroupRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ns.NetworkServerServiceClient.prototype.flushMulticastQueueForMulticastGroup =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ns.NetworkServerService/FlushMulticastQueueForMulticastGroup',
      request,
      metadata,
      methodInfo_NetworkServerService_FlushMulticastQueueForMulticastGroup,
      callback);
};


/**
 * @param {!proto.ns.FlushMulticastQueueForMulticastGroupRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     The XHR Node Readable Stream
 */
proto.ns.NetworkServerServicePromiseClient.prototype.flushMulticastQueueForMulticastGroup =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.flushMulticastQueueForMulticastGroup(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.ns.GetMulticastQueueItemsForMulticastGroupRequest,
 *   !proto.ns.GetMulticastQueueItemsForMulticastGroupResponse>}
 */
const methodInfo_NetworkServerService_GetMulticastQueueItemsForMulticastGroup = new grpc.web.AbstractClientBase.MethodInfo(
  proto.ns.GetMulticastQueueItemsForMulticastGroupResponse,
  /** @param {!proto.ns.GetMulticastQueueItemsForMulticastGroupRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.ns.GetMulticastQueueItemsForMulticastGroupResponse.deserializeBinary
);


/**
 * @param {!proto.ns.GetMulticastQueueItemsForMulticastGroupRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.ns.GetMulticastQueueItemsForMulticastGroupResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.ns.GetMulticastQueueItemsForMulticastGroupResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ns.NetworkServerServiceClient.prototype.getMulticastQueueItemsForMulticastGroup =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ns.NetworkServerService/GetMulticastQueueItemsForMulticastGroup',
      request,
      metadata,
      methodInfo_NetworkServerService_GetMulticastQueueItemsForMulticastGroup,
      callback);
};


/**
 * @param {!proto.ns.GetMulticastQueueItemsForMulticastGroupRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.ns.GetMulticastQueueItemsForMulticastGroupResponse>}
 *     The XHR Node Readable Stream
 */
proto.ns.NetworkServerServicePromiseClient.prototype.getMulticastQueueItemsForMulticastGroup =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.getMulticastQueueItemsForMulticastGroup(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.google.protobuf.Empty,
 *   !proto.ns.GetVersionResponse>}
 */
const methodInfo_NetworkServerService_GetVersion = new grpc.web.AbstractClientBase.MethodInfo(
  proto.ns.GetVersionResponse,
  /** @param {!proto.google.protobuf.Empty} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.ns.GetVersionResponse.deserializeBinary
);


/**
 * @param {!proto.google.protobuf.Empty} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.ns.GetVersionResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.ns.GetVersionResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ns.NetworkServerServiceClient.prototype.getVersion =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ns.NetworkServerService/GetVersion',
      request,
      metadata,
      methodInfo_NetworkServerService_GetVersion,
      callback);
};


/**
 * @param {!proto.google.protobuf.Empty} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.ns.GetVersionResponse>}
 *     The XHR Node Readable Stream
 */
proto.ns.NetworkServerServicePromiseClient.prototype.getVersion =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.getVersion(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


module.exports = proto.ns;

