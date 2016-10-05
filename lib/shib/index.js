var client = require('./client')
  , auth = require('./auth')
  , logger = require('./logger');

var default_configs = {
  listen: 3000,
  fetch_lines: 1000,
  query_timeout: null,
  setup_queries: [],
  setup_queries_auth: [],
  max_result_file_byte_size: null,
  storage: {
    datadir: './var'
  },
  disable_history: false,
  auth: null,
  engines: [
    {
      label: 'hive',
      executer: {
        name: 'hiveserver',
        host: 'localhost',
        port: 10000,
        support_database: true,
        default_database: 'default',
        query_timeout: null,
        setup_queries: [],
        setup_queries_auth: []
      },
      monitor: null
    }
  ]
};

var config = null;
var log = null;

exports.init = function(arg){
  var merge = function(destination, source) {
    for (var property in source) {
      if (source.hasOwnProperty(property)) {
        destination[property] = source[property];
      }
    }
    return destination;
  };
  config = merge(merge({}, default_configs), arg);

  log = new logger.Logger(config.logger || {});
};

exports.setting = function(key){
  return config[key];
};

exports.client = function(arg){
  if (!arg)
    arg = {};
  return new client.Client(config, log, arg.credential);
};

exports.auth = function(arg){
  return new auth.Auth(config.auth || {}, log);
};

exports.logger = function(){
  return log;
};
