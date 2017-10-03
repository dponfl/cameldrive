"use strict";

const _ = require('lodash');

module.exports = {
  loadConfig: function (req, res) {

    console.log('<== ConfigController.js:loadConfig ==>');

    return res.ok({result: 'ok', data: {one: 'one'}, token: '123'});
  },
};