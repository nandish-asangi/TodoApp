const TweetDB = require("../db/TweetDB");

class TweetBiz {

    constructor() {
        this.tweetDBObj = new TweetDB();
    }

    async createTweet(tweetContent) {
        return new Promise(async (resolve, reject) => {
            try {
                // TODO: Model Validations need to be applied
                let dbresult = await this.tweetDBObj.saveTweet(tweetContent);
                return resolve(JSON.stringify(dbresult));

            } catch (error) {
                return reject(error);
            }
        });
    }

    async retrieveTweets(pageNumber) {
        return new Promise(async (resolve, reject) => {
            try {
                let dbresult = await this.tweetDBObj.fetchTweets(pageNumber);
                return resolve(JSON.stringify(dbresult));

            } catch (error) {
                return reject(error);
            }
        });
    }

    async retrieveTweet(uid) {
        return new Promise(async (resolve, reject) => {
            try {
                let dbresult = await this.tweetDBObj.fetchTweet(uid);
                return resolve(JSON.stringify(dbresult));

            } catch (error) {
                return reject(error);
            }
        });
    }

    async updateTweetContent(data) {
        return new Promise(async (resolve, reject) => {
            try {
                let dbresult = await this.tweetDBObj.updateRecord(data);
                return resolve(JSON.stringify(dbresult));

            } catch (error) {
                return reject(error);
            }
        });
    }

    async removeTweetContent(data) {
        return new Promise(async (resolve, reject) => {
            try {
                let dbresult = await this.tweetDBObj.deleteRecord(data);
                return resolve(JSON.stringify(dbresult));

            } catch (error) {
                return reject(error);
            }
        });
    }
}

module.exports = TweetBiz;
