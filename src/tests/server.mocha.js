const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.should();

describe("Issues", () => {
  describe("GET /", () => {
    it("should get all the issues from database", (done) => {
      chai.request('http://localhost:5151')
        .get('/issues')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('Object');
          done();
        });
    });
    it("updated a single issue", (done) => {
      const id = 1;
      chai.request('http://localhost:5151')
        .put(`/issues/${id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });
});