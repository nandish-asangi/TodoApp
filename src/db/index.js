var mysql = require("mysql");
var config = require("config");
var state = {
    pool: null
};

exports.connect = function (done) {
    try {
        state.pool = mysql.createPool(config.get("db.mysql"));
        done();
    } catch (error) {
        done(error);
    }
}

exports.get = function () {
    return state.pool;
}

exports.getConnection = async function () {
    return new Promise((resolve, reject) => {
        return state.pool.getConnection(function (err, connection) {
            if (err) {
                return reject(err);
            }
            return resolve(connection);
        });
    });
}