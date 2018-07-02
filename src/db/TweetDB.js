var db = require("./index");

class TweetDB {

    async saveTweet(tweetContent) {
        return new Promise(async (resolve, reject) => {
            try {
                
                const query = `INSERT INTO tweets (uid, content, created_at, updated_at) VALUES(?, ?, ?, ?)`;
                let connection = await db.getConnection();
                connection.query(query, [0, tweetContent, new Date(), new Date()], (error, result, fields) => {
                    connection.release();
                    if (error) {
                        return reject(error);
                    }
                    return resolve(result);
                });
            } catch (error) {
                return reject(error);
            }
        });
    }

    async fetchTweets(pageNumber) {
        return new Promise(async (resolve, reject) => {
            try {
                var response = {};

                const query = `select * from tweets limit ?,?`;
                let connection = await db.getConnection();
                connection.query(query, [(pageNumber-1)*5, 5], (error, result, fields) => {
                    if (error) {
                        return reject(error);
                    }

                    connection.query('select count(*) as count from tweets', [], (error, count, fields) => {
                        if (error) {
                            return reject(error);
                        }
                        connection.release();

                        response.total_tweets = count[0].count;
                        response.data = result;

                        return resolve(response);
                    });
                });
            } catch (error) {
                return reject(error);
            }
        });
    }

    async fetchTweet(uid) {
        return new Promise(async (resolve, reject) => {
            try {
                
                const query = `select * from tweets where uid = ?`;
                let connection = await db.getConnection();
                connection.query(query, [uid], (error, result, fields) => {
                    connection.release();
                    if (error) {
                        return reject(error);
                    }
                    return resolve(result);
                });
            } catch (error) {
                return reject(error);
            }
        });
    }

    async updateRecord(data) {
        return new Promise(async (resolve, reject) => {
            try {
                
                const query = `update tweets set content = ? where uid = ?`;
                let connection = await db.getConnection();
                connection.query(query, [data.tweet, data.uid], (error, result, fields) => {
                    connection.release();
                    if (error) {
                        return reject(error);
                    }
                    return resolve(result);
                });
            } catch (error) {
                return reject(error);
            }
        });
    }

    async deleteRecord(data) {
        return new Promise(async (resolve, reject) => {
            try {
                
                const query = `delete from tweets where uid = ?`;
                let connection = await db.getConnection();
                connection.query(query, [data.uid], (error, result, fields) => {
                    connection.release();
                    if (error) {
                        return reject(error);
                    }
                    return resolve(result);
                });
            } catch (error) {
                return reject(error);
            }
        });
    }
}

module.exports = TweetDB;

