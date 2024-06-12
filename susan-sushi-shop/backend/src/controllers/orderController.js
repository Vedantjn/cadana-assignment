const Order = require('../models/order');

exports.addToCart = async (req, res) => {
    const { sushiA, sushiB } = req.body;
    const priceA = 3;
    const priceB = 4;
    const totalPieces = sushiA + sushiB;
    let discount = 0;

    if (totalPieces >= 20) {
        discount = 0.20;
    } else if (totalPieces >= 10) {
        discount = 0.10;
    }

    const now = new Date();
    const currentHour = now.getHours();
    if (currentHour >= 11 && currentHour <= 14) {
        discount += 0.20;
    }

    const totalPrice = (sushiA * priceA) + (sushiB * priceB);
    const discountApplied = totalPrice * discount;
    const finalPrice = totalPrice - discountApplied;

    try {
        const order = new Order({
            total_price: totalPrice.toFixed(2),
            discount_applied: discountApplied.toFixed(2),
            final_price: finalPrice.toFixed(2),
            items: [
                { sushi_type: 'Sushi A', quantity: sushiA, price_per_unit: priceA },
                { sushi_type: 'Sushi B', quantity: sushiB, price_per_unit: priceB }
            ]
        });
        const savedOrder = await order.save();

        res.json({ orderId: savedOrder._id, totalPrice: totalPrice.toFixed(2), discountApplied: discountApplied.toFixed(2), finalPrice: finalPrice.toFixed(2) });
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.getOrderedSushi = async (req, res) => {
    try {
        const orders = await Order.find();
        const orderedSushi = orders.map(order => {
            const sushiAItem = order.items.find(item => item.sushi_type === 'Sushi A');
            const sushiBItem = order.items.find(item => item.sushi_type === 'Sushi B');

            const sushiAQuantity = sushiAItem ? sushiAItem.quantity : 0;
            const sushiBQuantity = sushiBItem ? sushiBItem.quantity : 0;

            return {
                sushiA: sushiAQuantity,
                sushiB: sushiBQuantity,
                discountApplied: order.discount_applied,
                totalDiscount: order.discount_applied * (order.total_price - order.final_price),
                totalPrice: order.total_price
            };
        });
        res.json(orderedSushi);
    } catch (error) {
        console.error('Error fetching ordered sushi:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
