//const assert = require('chai').assert;
const chai = require("chai")
const chaiHttp = require("chai-http")
const expect = chai.expect
chai.use(chaiHttp)

var host = "http://localhost:3000";

describe("POST /login", () => {

    it("Debe devolver el estado 200", async () => {
        let res = await chai
            .request(host)
            .post('/auth/login')
            .send({ email: "juan", password: "1234" }) // tiene que existir en mongo

        expect(res.status).to.equal(200)
    })

});
