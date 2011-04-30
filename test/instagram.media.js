(function() {
  /*
  Testing Media Methods
  */  var Instagram, assert, should, test;
  console.log("\nInstagram API Node.js Lib Tests :: Media");
  Instagram = require('../lib/class.instagram');
  assert = require('assert');
  should = require('should');
  test = require('./helpers.js');
  module.exports = {
    'media#popular': function() {
      return test.helper('media#popular', Instagram, 'media', 'popular', {}, function(data) {
        data.length.should.equal(32);
        test.output("data had length equal to 32");
        data[0].should.have.property('id');
        return test.output("data[0] had the property 'id'", data[0].id);
      });
    },
    'media#info for id#3': function() {
      return test.helper('media#info for id#3', Instagram, 'media', 'info', {
        media_id: 3
      }, function(data) {
        data.should.have.property('id', '3');
        test.output("data had the property 'id' equal to 3");
        data.should.have.property('created_time', '1279315783');
        return test.output("data had the property 'created_time' equal to 1279315783");
      });
    },
    'media#search for 48.858844300000001/2.2943506': function() {
      return test.helper('media#search for 48.858844300000001/2.2943506', Instagram, 'media', 'search', {
        lat: 48.858844300000001,
        lng: 2.2943506
      }, function(data) {
        data.length.should.be.above(0);
        test.output("data had length greater than 0", data.length);
        data[0].should.have.property('id');
        return test.output("data[0] had the property 'id'", data[0].id);
      });
    },
    'media#like id#3': function() {
      return test.helper('media#like id#3', Instagram, 'media', 'like', {
        media_id: 3
      }, function(data) {
        if (data !== null) {
          throw "like failed";
        }
        test.output("data was null; we liked media #3");
        return test.helper('media#likes for id#3', Instagram, 'media', 'likes', {
          media_id: 3
        }, function(data) {
          data.length.should.be.above(0);
          test.output("data had length greater than 0", data.length);
          return test.helper('media#unlike id#3', Instagram, 'media', 'unlike', {
            media_id: 3
          }, function(data) {
            if (data !== null) {
              throw "unlike failed";
            }
            return test.output("data was null; we unliked media #3");
          });
        });
      });
    },
    'media#comment id#53355234': function() {
      return test.helper('media#comment id#53355234', Instagram, 'media', 'comment', {
        media_id: 53355234,
        text: 'Instagame was here.'
      }, function(data) {
        var comment_id;
        data.should.have.property('id');
        test.output("data had the property 'id'", data.id);
        data.should.have.property('from');
        test.output("data had the property 'from'", data.from);
        data.should.have.property('created_time');
        test.output("data had the property 'created_time'", data.created_time);
        data.should.have.property('text');
        test.output("data had the property 'text'", data.text);
        comment_id = data['id'];
        test.output("created comment " + comment_id);
        return test.helper('media#comments for id#53355234', Instagram, 'media', 'comments', {
          media_id: 53355234
        }, function(data) {
          data.length.should.be.above(0);
          test.output("data had length greater than 0", data.length);
          return test.helper('media#uncomment id#53355234', Instagram, 'media', 'uncomment', {
            media_id: 53355234,
            comment_id: comment_id
          }, function(data) {
            if (data !== null) {
              throw "uncomment failed";
            }
            return test.output("data was null; we deleted comment " + comment_id);
          });
        });
      });
    }
  };
}).call(this);
