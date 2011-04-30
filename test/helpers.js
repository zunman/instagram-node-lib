(function() {
  var indent;
  indent = "   ";
  module.exports = {
    indent: indent,
    helper: function(title, Instagram, type, method, params, assertions) {
      if (title == null) {
        title = '';
      }
      if (params == null) {
        params = {};
      }
      params['complete'] = function(data, pagination) {
        console.log("\n" + title + "\n" + indent + "connection/parsing succeeded");
        try {
          assertions(data, pagination);
          return console.log("" + indent + "data met assertions");
        } catch (e) {
          console.log("" + indent + "data failed to meet the assertion(s): " + e);
          throw e;
        }
      };
      params['error'] = function(e, data, caller) {
        console.log("" + indent + "error: " + e + "\n" + indent + "data: " + data + "\n" + indent + "caller: " + caller);
        throw e;
      };
      return Instagram[type][method](params);
    },
    output: function(message, value) {
      if (value == null) {
        value = null;
      }
      console.log("" + indent + message);
      if (value != null) {
        if (typeof value === 'object') {
          return console.log(("" + indent + indent + "it was: ") + JSON.stringify(value));
        } else {
          return console.log("" + indent + indent + "it was: " + value);
        }
      }
    }
  };
}).call(this);
