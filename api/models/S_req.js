/**
 * S_req.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 's_req',
  attributes: {
    car_group: {
      type: 'string',
      size: 50
    },
    name: {
      type: 'string',
      size: 50
    },
    email: {
      type: 'string',
      size: 50
    },
    phone: {
      type: 'string',
      size: 50
    },
    additionalInfo: {
      type: 'string',
      size: 255
    },
    period_start: {
      type: 'datetime',
    },
    pariod_end: {
      type: 'datetime',
    },
    pLocation: {
      type: 'string',
      size: 255
    },
    dLocation: {
      type: 'string',
      size: 255
    },
    user_agent: {
      type: 'string',
      size: 255
    },
    ip: {
      type: 'string',
      size: 50
    },
    cookie: {
      type: 'string',
      size: 255
    },
  },
};

