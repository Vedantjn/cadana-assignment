import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import sushiImageA from '../images/sushiA.jpg';
import sushiImageB from '../images/sushiB.jpg';
import './PlaceOrder.css';

function PlaceOrder() {
    const [sushiA, setSushiA] = useState(0);
    const [sushiB, setSushiB] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [finalPrice, setFinalPrice] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [discountDescription, setDiscountDescription] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const calculatePrice = () => {
        const priceA = 3;
        const priceB = 4;
        const totalPieces = sushiA + sushiB;
        let discount = 0;
        let description = '';

        if (totalPieces >= 20) {
            discount = 0.20;
            description = '20%';
        } else if (totalPieces >= 10) {
            discount = 0.10;
            description = '10%';
        }

        const now = new Date();
        const currentHour = now.getHours();
        if (currentHour >= 11 && currentHour <= 14) {
            discount += 0.20;
            description += (description ? ' + 20% "Lunch Deal"' : '20% "Lunch Deal"');
        }

        const totalPrice = (sushiA * priceA) + (sushiB * priceB);
        const discountApplied = totalPrice * discount;
        const finalPrice = totalPrice - discountApplied;

        setTotalPrice(totalPrice.toFixed(2));
        setDiscount(discountApplied.toFixed(2));
        setFinalPrice(finalPrice.toFixed(2));
        setDiscountDescription(description);

        setErrorMessage('');
    };

    const handleOrder = async () => {
        if (sushiA === 0 && sushiB === 0) {
            setErrorMessage("Cannot place order since none of the items is picked.");
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/add-to-cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ sushiA, sushiB }),
            });
            const data = await response.json();
            console.log('Order placed:', data);
            navigate('/ordered-sushi');
        } catch (error) {
            console.error('Error placing order:', error);
        }
    };

    return (
        <div className="place-order-container">
            <div className="order-form">
                <h1>Order Sushi</h1>
                <div className="sushi-container">
                    <div className="sushi-item">
                        <img src={sushiImageA} alt="Sushi A" className="sushi-image" />
                        <label>
                            Sushi A (3£ each):
                            <input
                                type="number"
                                value={sushiA}
                                onChange={(e) => {
                                    const value = parseInt(e.target.value);
                                    if (!isNaN(value)) {
                                        setSushiA(value);
                                    }
                                }}
                                className="order-input"
                            />
                        </label>
                    </div>
                    <div className="sushi-item">
                        <img src={sushiImageB} alt="Sushi B" className="sushi-image" />
                        <label>
                            Sushi B (4£ each):
                            <input
                                type="number"
                                value={sushiB}
                                onChange={(e) => {
                                    const value = parseInt(e.target.value);
                                    if (!isNaN(value)) {
                                        setSushiB(value);
                                    }
                                }}
                                className="order-input"
                            />
                        </label>
                    </div>
                </div>
                <button className="calculate-button" onClick={calculatePrice}>Add to Cart</button>
                <div className="price-details">
                    <p>Total Price: {totalPrice}£</p>
                    <p>Discount: {discount}£ ({discountDescription})</p>
                    <p>Final Price: {finalPrice}£</p>
                </div>
                <button className="order-button" onClick={handleOrder}>Place Order</button>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </div>
        </div>
    );
}

export default PlaceOrder;
