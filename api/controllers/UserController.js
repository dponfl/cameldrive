/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const _ = require('lodash');

module.exports = {
  find: function (req, res) {

    // todo: make parameters validation
    var whereObj = req.allParams();

    User.findOne({
      where: whereObj
    })
      .exec((err, data) => {

        if (err) {
          return res.serverError(err);
        }

        if (_.isNil(data) || data.length == 0) {
          return res.notFound({
            code: 404,
            message: 'Not found'});
        }

        return res.ok({
          code: 200,
          message: 'OK',
          result: data
        });

      });
  }, // find

  update: function (req, res) {

    // todo: make parameters validation
    var params = req.allParams();

    if (_.isNil(params.criteria)) {
      return res.badRequest('Criteria parameter not defined');
    }

    if (_.isNil(params.val)) {
      return res.badRequest('Val parameter not defined');
    }

    User.update(params.criteria, params.val)
      .exec((err, data) => {

        if (err) {
          return res.serverError(err);
        }

        if (_.isNil(data) || data.length == 0) {
          return res.notFound({
            code: 404,
            message: 'Not found'});
        }

        return res.ok({
          code: 200,
          message: 'OK',
          result: data
        });

      });
  }, // update


};

