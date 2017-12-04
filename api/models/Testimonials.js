/**
 * Testimonials.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'testimonials',
  attributes: {
    lang: {
      type: 'string',
      size: 2
    },
    original_lang: {
      type: 'string',
      size: 2
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
    info: {
      type: 'text',
    },
    position: {
      type: 'string',
      size: 50
    },
    rate: {
      type: 'integer',
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

