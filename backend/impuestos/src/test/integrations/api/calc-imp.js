const server = require('../../../../index');
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
chai.use(chaiHttp);
const pais = require('../../../models/country');

describe("funcionalidades de impuestos", () => {

    it("Obtener paises debe devolver estado 200", async () => {
        let res = await chai
            .request(server)
            .get('/calc/todosCountry');

        expect(res.status).to.equal(200);
    });

    it("Obtener cálculo de impuesto debe devolver estado 200", async () => {
        let res = await chai
            .request(server)
            .post('/calc/impuesto')
            .send({ pais: "Guatemala", precio: "500"});

        expect(res.status).to.equal(200);
    });
});