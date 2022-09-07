const request = require ("supertest")
const expect = require ("chai").expect

describe("productTest",()=>{
    it ("should save a product",(done)=>{
        request("https://proyectoch-du-22.herokuapp.com")
            .post("/productos")
            .send({
                name: "testproducto",
                price: 1234,
                url: "http://www.linktest.com"
            })
            .end((err,res)=>{
                expect(res.statusCode).to.be.equal(200);
                expect(res.body.save).to.be.equal("OK");
                done();
            })
    })

    it ("should update a product",(done)=>{
        request("https://proyectoch-du-22.herokuapp.com")
            .put("/productos/1234")
            .send({
                name: "testproductoupdate",
                price: 7894,
                url: "http://www.linktest258.com"
            })
            .end((err,res)=>{
                expect(res.statusCode).to.be.equal(200);
                expect(res.body.update).to.be.equal("OK");
                done();
            })
    })

    it ("should delete a product",(done)=>{
        request("https://proyectoch-du-22.herokuapp.com")
            .delete("/productos/1234")
            .send()
            .end((err,res)=>{
                expect(res.statusCode).to.be.equal(200);
                expect(res.body.delete).to.be.equal("OK");
                done();
            })

    })

    it ("should find a product",(done)=>{
        request("https://proyectoch-du-22.herokuapp.com")
            .get("/productos/1234")
            .send()
            .end((err,res)=>{
                expect(res.statusCode).to.be.equal(200);
                expect(res.body).to.be.eq({
                    id:1234,
                    name: "testproductoupdate",
                    price: 7894,
                    url: "http://www.linktest258.com"
                });
                done();
            })
    })
})