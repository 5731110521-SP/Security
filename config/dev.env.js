'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ROOT_API : '"http://192.9.58.79:8000/api/"',
  ROOT_LOG_API : '"http://192.9.58.79:8000/"',
})
