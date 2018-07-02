var TweetBiz = require("../biz/TweetBiz");

exports.addTweet = async (req, res, next) => {
    
    var body = req.body;
    res.setHeader('Content-Type', 'application/json');

    try {
        var response = {
            'status': true,
            'msg': 'Tweet Added'
        };

        if(body.tweet !== undefined){
            const tweetBiz = new TweetBiz();
            const dbresult = await tweetBiz.createTweet(body.tweet);

            if(JSON.parse(dbresult).affectedRows !== 1){
                response.status = false;
                response.msg = 'Tweet Failed !!';
            }
        }else{
            response.status = false;
            response.msg = 'Missing Tweet Content';
        }
        
        return res.send(response);

    } catch (error) {
        next(error);
    }
};

exports.getTweets = async (req, res, next) => {
    
    var pageNumber = 1;
    
    if(req.params.pageNumber !== null || req.params.pageNumber !== undefined){
        pageNumber = req.params.pageNumber;
    }
    console.log(pageNumber);
    res.setHeader('Content-Type', 'application/json');

    try {
        const tweetBiz = new TweetBiz();
        const tweets = await tweetBiz.retrieveTweets(pageNumber);
        return res.send(tweets);

    } catch (error) {
        next(error);
    }
};

exports.getTweet = async (req, res, next) => {
    
    var uid = req.params.uid;
    res.setHeader('Content-Type', 'application/json');
    
    try {
        const tweetBiz = new TweetBiz();
        const tweet = await tweetBiz.retrieveTweet(uid);
        return res.send(tweet);

    } catch (error) {
        next(error);
    }
};

exports.updateTweet = async (req, res, next) => {
    
    var body = req.body;
    res.setHeader('Content-Type', 'application/json');
    
    try {
        var response = {
            'status': true,
            'msg': 'Tweet Modified'
        };

        const tweetBiz = new TweetBiz();
        const tweet = await tweetBiz.updateTweetContent(body);

        if(JSON.parse(tweet).affectedRows !== 1){
            response.status = false;
            response.msg = 'Tweet Failed !!';
        }

        return res.send(response);

    } catch (error) {
        next(error);
    }
};

exports.deleteTweet = async (req, res, next) => {
    
    var body = req.body;
    res.setHeader('Content-Type', 'application/json');
    
    try {
        var response = {
            'status': true,
            'msg': 'Tweet Deleted'
        };

        const tweetBiz = new TweetBiz();
        const tweet = await tweetBiz.removeTweetContent(body);

        if(JSON.parse(tweet).affectedRows !== 1){
            response.status = false;
            response.msg = 'Tweet Failed !!';
        }

        return res.send(response);

    } catch (error) {
        next(error);
    }
};