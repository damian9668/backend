const axios = require("axios");
const expect = require ("chai").expect

describe("productAxiosTest",()=>{
    it ("should save a product",(done)=>{
        axios.post("https://proyectoch-du-22.herokuapp.com/productos",{
            name: "testproducto",
            price: 1234,
            url: "http://www.linktest.com"
        }).then((data)=>{
            expect(data.status).to.be.equal(200);
            expect(data.data.save).to.be.equal("OK");
            done();
        })
    })

    it ("should update a product",(done)=>{
        axios.put("https://proyectoch-du-22.herokuapp.com/productos/1234",{
            name: "testproductoupdate",
            price: 7894,
            url: "http://www.linktest258.com"
        }).then((data)=>{
            expect(data.status).to.be.equal(200);
            expect(data.data.update).to.be.equal("OK");
            done();
        })
    })

    it ("should delete a product",(done)=>{
        axios.delete("https://proyectoch-du-22.herokuapp.com/productos/1234").then((data)=>{
            expect(data.status).to.be.equal(200);
            expect(data.data.delete).to.be.equal("OK");
            done();
        })
    })

    it ("should find a product",(done)=>{
        axios.get("https://proyectoch-du-22.herokuapp.com/productos/1234").then((data)=>{
            expect(data.status).to.be.equal(200);
            expect(data.data).to.be.equal({
                id:1234,
                name: "testproductoupdate",
                price: 7894,
                url: "http://www.linktest258.com"
            });
            done();
        })
    })
})