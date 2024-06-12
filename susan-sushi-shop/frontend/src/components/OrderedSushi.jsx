import React, { useEffect, useState } from 'react';
import './OrderedSushi.css';

const OrderedSushi = () => {
    const [orderedSushi, setOrderedSushi] = useState([]);

    useEffect(() => {
        const fetchOrderedSushi = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/ordered-sushi');
                const data = await response.json();
                // console.log(data);
                setOrderedSushi(data);
                
            } catch (error) {
                console.error('Error fetching ordered sushi:', error);
            }
        };
        fetchOrderedSushi();
    }, []);

    return (
        <div className="ordered-sushi-container">
            <h2>Ordered Sushi</h2>
            {Array.isArray(orderedSushi) && orderedSushi.length > 0 ? (
                <ul className="ordered-sushi-list">
                    {orderedSushi.map((order, index) => (
                        <li key={index} className="ordered-sushi-item">
                            <div className="order-title">Order {index + 1}:</div>
                            <div>Sushi A: <span className="order-value">{order.sushiA}</span></div>
                            <div>Sushi B: <span className="order-value">{order.sushiB}</span></div>
                            <div>Discount Applied (if any): <span className="order-value">{order.discountApplied.toFixed(2)}%</span></div>
                            <div>Total Discount: <span className="order-value">{order.totalDiscount.toFixed(2)}£</span></div>
                            <div>Total Price: <span className="order-value">{order.totalPrice}£</span></div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="no-sushi-message">No ordered sushi found</p>
            )}
        </div>
    );
};

export default OrderedSushi;
