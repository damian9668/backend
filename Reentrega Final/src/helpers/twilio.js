import sgMail from '@sendgrid/mail';

export const sendRegisterEmail = async (email) => {

    sgMail.setApiKey(process.env.TWILIO_CREDENTIAL)

    const msg = {
        to: email, // Change to your recipient
        from: 'damian.ullmann@gmail.com', // Change to your verified sender
        subject: '[e-commerce] Registro exitoso!',
        html: 'Gracias por registrarte en e-commerce, utiliza todos nuestros servicios de tienda!',
    }

    await sgMail.send(msg);
}

export const sendOrderEmail = async (order) => {

    sgMail.setApiKey(process.env.TWILIO_CREDENTIAL)

    const itemsTemplate = (items) => {
        return items.reduce((accum, value) => {
            accum += `
                <li>${value.item.description} x${value.quantity}</li>
            `
            return accum;
        }, '');
    }

    const emailTemplate  = (order) => `
        <strong>Orden generada exitosamente!</strong>
        <hr>
        Detalle:
        <ul>
            ${itemsTemplate(order.items.rows)}
        </ul>
        <hr>
    `

    console.log(emailTemplate(order))

    const msg = {
        to: order.email, // Change to your recipient
        from: 'damian.ullmann@gmail.com', // Change to your verified sender
        subject: '[e-commerce] Nueva orden generada!',
        html: emailTemplate(order),
    }

    await sgMail.send(msg);
}