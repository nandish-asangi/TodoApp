class TweetModel {

    constructor(uid, content, createdAt, updatedAt) {
        this.uid = uid;
        this.content = content;
        this.created_at = createdAt;
        this.updated_at = updatedAt;
    }
}

module.exports = TweetModel;


