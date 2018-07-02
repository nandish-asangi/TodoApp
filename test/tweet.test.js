process.env.NODE_ENV = 'test';
let chai = require("chai");
let expect = chai.expect;
let assert = chai.assert;
let chaiHttp = require("chai-http");
let server = require("../app");


chai.use(chaiHttp);

describe("Tweet APIs", () => {

    it("GET /tweets - Gets All Tweets", (done) => {
        chai.request(server)
            .get("/tweets/4")
            .set("content-type", "text/plain")
            .send()
            .end((err, res) => {
                assert.equal(200, res.statusCode);
                done();
            });
    });

    it("GET /tweet - Get tweet", (done) => {
        chai.request(server)
            .get("/tweet/4")
            .set("content-type", "text/plain")
            .send()
            .end((err, res) => {
                assert.equal(200, res.statusCode);
                done();
            });
    });
});