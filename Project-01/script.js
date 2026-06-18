const customer = "Adrina Patel";
const orderId = 101;
const item = "Nike Shoes";
const amount = 2999;
const deliveryDate = "10 june 2026";
const emailBody = `
Dear ${customer},

Thank you for your order! 

Order Details:
---------------

order ID   : ${orderId}
item       : ${item}
Amount     : ${amount}
Delivery   : ${deliveryDate}

Please keep this email for your records.

Regards,
Team shopEasy
`;

console.log(emailBody);

document.querySelector("#emailOutput").textContent = emailBody;