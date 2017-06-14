var db = require('../db');

module.exports = {
  messages: {
    get: function (callback) {
      var queryStr = "select m.id, m.text, m.roomname, u.name from messages m left join \
                      users u on m.user = u.id order by m.id desc";
      db.query(queryStr, function(err, results) {
        callback(err, results);
      });
    },
    post: function (params, callback) {
      var queryStr = "insert into messages (text, user, roomname) \
                      values (?, (SELECT id FROM users WHERE name = ? limit 1), ?)";
      db.query(queryStr, params, function(err, results) {
        callback(err, results);
      });
    }
  },

  users: {
    // Ditto as above.
    get: function (callback) {
      var queryStr = "select * from users";
      db.query(queryStr, function(err, results) {
        callback(err, results);
      });
    },
    post: function (params, callback) {
      var queryStr = "insert into users (name) values (?)";
      db.query(queryStr, params, function(err, results) {
        callback(err, results);
      });
    }
  }
};

