/**
 * TestimonialsController
 *
 * @description :: Server-side logic for managing testimonials
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var _ = require('lodash');

module.exports = {
	find: function (req, res) {

	  var rec = [];
	  var numRecToShow = 1;

    console.log('<== TestimonialsController.js:find ==>');

    // todo: make parameters validation
    var requestParams = req.allParams();
    var whereObj = requestParams;

    console.log('whereObj:');
    console.dir(whereObj);

    Testimonials.find({
      where: whereObj
    })
      .exec(function (err, data) {

        if (err) {
          return res.serverError(err);
        }

        return res.ok({
          code: 200,
          message: 'OK',
          result: data
        });

      });

/*    Testimonials.count({
      where: whereObj
    })
      .exec(function (err, numRecs) {

        // Generate array of numRecToShow random integers to be used
        // as testimonials records numbers

        if (err) {
          return res.serverError(err);
        }

        var randRec;

        console.log('Number of records: ' + numRecs);

        for (let i = 1; i <= numRecToShow; i++) {
          var j = 0;

          do {
            j++;
            randRec = _.random(numRecs);
          } while (!_.some(rec, randRec) || j >=1000);

          rec.push(randRec);
          console.log('randRec: ' + randRec);
          console.log('rec:');
          console.dir(rec);
        }

        console.log('Generated rec:');
        console.dir(rec);

        // Get testimonials records corresponding to rec array

        Testimonials.find({
          id: rec
        })
          .exec(function (err, data) {

            if (err) {
              return res.serverError(err);
            }

            return res.ok({
              code: 200,
              message: 'OK',
              result: data
            });

          })
      });*/

  }, // find

  put: function (req, res) {
    /*
     console.log('=======================');
     console.log('req.body:');
     console.dir(req.body);
     console.log('req.headers:');
     console.dir(req.headers);
     console.log('req.ip:');
     console.dir(req.ip);
     console.log('req.ips:');
     console.dir(req.ips);
     console.log('req.method:');
     console.dir(req.method);
     console.log('req.params:');
     console.dir(req.params);
     console.log('req.allParams():');
     console.dir(req.allParams());
     */

    console.log('<== TestimonialsController.js:put ==>');

    // todo: make parameters validation
    var newRecordParams = req.allParams();
    var newObj = newRecordParams;

    console.log('Ready to create new record:');
    console.dir(newObj);

    Testimonials.create(newObj)
      .exec(function (err, data) {
        if (err) {
          return res.serverError(err);
        }

        console.log('data: ');
        console.dir(data);

        return res.created({
          code: 201,
          message: 'OK',
          result: data});
      });
  }, // put

  update: function (req, res) {
    /*
     console.log('=======================');
     console.log('req.body:');
     console.dir(req.body);
     console.log('req.headers:');
     console.dir(req.headers);
     console.log('req.ip:');
     console.dir(req.ip);
     console.log('req.ips:');
     console.dir(req.ips);
     console.log('req.method:');
     console.dir(req.method);
     console.log('req.params:');
     console.dir(req.params);
     console.log('req.allParams():');
     console.dir(req.allParams());
     */

    console.log('<== TestimonialsController.js:update ==>');

    // todo: make parameters validation
    var newRecordParams = req.allParams();
    var newObj = newRecordParams;

    console.log('Ready to update record:');
    console.dir(newObj);

    var findCriteria = {
      id: newObj.id,
    };

    Testimonials.update(findCriteria, newObj)
      .exec(function (err, data) {
        if (err) {
          return res.serverError(err);
        }

        console.log('data: ');
        console.dir(data);

        return res.json({
          code: 200,
          message: 'OK',
          result: data});
      });

  }, // update
};

