/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const _ = require('lodash');

module.exports = {
  find: function (req, res) {

    if (!_.isNil(req.session.user) && !_.isNil(req.session.user.pw) && req.session.user.pw) {

      console.log('req.session.user:');
      console.dir(req.session.user);

      return res.ok({
        code: 200,
        message: 'OK',
        activeSession: true,
        result: req.session.user
      });
    } else {
      console.log('req.session.user is not defined');
    }


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

  login: function (req, res) {

    if (!_.isNil(req.session.user) && !_.isNil(req.session.user.pw) && req.session.user.pw) {

      console.log('req.session.user:');
      console.dir(req.session.user);

      return res.ok({
        code: 200,
        message: 'OK',
        activeSession: true,
        result: req.session.user
      });
    } else {
      console.log('req.session.user is not defined');
    }


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

        req.session.user = data;

        console.log('findOne, req.session.user:');
        console.dir(req.session.user);

        return res.ok({
          code: 200,
          message: 'OK',
          result: data
        });

      });
  }, // login

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

        if (_.isArray(data)) {
          if (data[0].username && data[0].pw) {
            req.session.user = data[0];
          }
        } else {
          if (data.username && data.pw) {
            req.session.user = data;
          }
        }


        console.log('update, req.session.user:');
        console.dir(req.session.user);


        return res.ok({
          code: 200,
          message: 'OK',
          activeSession: true,
          result: data
        });

      });
  }, // update


  logout: function (req, res) {

    if (!_.isNil(req.session.user)) {

      console.log('logout, req.session.user:');
      console.dir(req.session.user);

      delete req.session.user;

      if (!_.isNil(req.session.user)) {
        console.log('req.session.user is not deleted');

        return res.serverError('not deleted');
      } else {
        console.log('req.session.user is deleted');

        return res.ok({
          code: 200,
          message: 'OK',
        });
      }
    } else {

      console.log('logout, req.session.user does not exist');

      return res.badRequest('does not exist');
    }
  }, // logout


  check: function (req, res) {

    if (!_.isNil(req.session.user)) {

      console.log('check, req.session.user:');
      console.dir(req.session.user);

      return res.ok({
        code: 200,
        message: 'OK',
        activeSession: req.session.user.pw != '',
        result: req.session.user
      });

    } else {

      console.log('check, req.session.user does not exist');

      return res.notFound('user session not found');
    }
  }, // check


};

