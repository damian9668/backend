const sgMail = require("@sendgrid/mail");
const userActivo = require("../controllers/login")

const emailSender = 'damian.ullmann@hotmail.com'
const apiKey = process.env.twilio_email

const accountSid = process.env.wpp_sid;
const authToken = process.env.wpp_token;
const cliente = "+5492612077509"
const client = require('twilio')(accountSid, authToken);

async function carrito(req,res){
    //console.log(userActivo);
    const productos = req.body;
    const productosString = productos.reduce((acc,act)=>{
        return acc.concat(`Nombre: ${act.name}, Precio:${act.price}\n`)
    },"");
    // console.log(productosString);

    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(apiKey)
    const msg = {
        to: emailSender, // Change to your recipient
        from: emailSender, // Change to your verified sender
        subject: 'Nuevo Pedido',
        text: `Nombre: ${userActivo.firstName} ${userActivo.lastName}\nEmail: ${userActivo.email}\nPedido:\n${productosString}`
    }
    sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent')
        })
        .catch((error) => {
            console.error(error)
        })

    const options = {
        body: `Nombre: ${userActivo.firstName} ${userActivo.lastName}\nEmail: ${userActivo.email}\nPedido:\n${productosString}`,
        mediaUrl: ['https://lanacion.com.ec/wp-content/uploads/2019/12/logos-coderhouse-01.png'],
        from: 'whatsapp:+14155238886',
        to: `whatsapp:${cliente}`
    };

    try {
        const message = await client.messages.create(options);
        console.log(message);
    } catch (error) {
        console.log(error);
    }

    res.status(200).send("OK");
}

module.exports = {
    carrito
}