module.exports = {

  // See https://github.com/NodeRedis/node-redis?undefined#rediscreateclient
  redis: {
    host: '127.0.0.1',
    port: 6379,
    path: null,   // UNIX socket,
    db: '',
    password: ''
  },

  // See https://www.npmjs.com/package/mongodb#quick-start
  mongo: {
    uri: 'mongodb://127.0.0.1',
    database: '',
    collection: '',
    options: {
      useUnifiedTopology: true
    },
  },

};
