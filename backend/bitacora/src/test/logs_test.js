const server = require('../../index');
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
chai.use(chaiHttp);

describe("funcionalidades de bitacora", () => {

    it("Guardar una bitacora devolver estado 200", async () => {
        let res = await chai
            .request(server)
            .post('/logs/save')
            .send({ username: "juan", email: "juan@gmail.com", fecha: "25/006/21", mensaje: "test bitacora" })

        expect(res.status).to.equal(200)
    });

    it("Buscar bitacora debe devolver estado 200", async () => {
        let res = await chai
            .request(server)
            .post('/logs/search')
            .send({ email: "juan@gmail.com" });

        expect(res.status).to.equal(200);
    });
});