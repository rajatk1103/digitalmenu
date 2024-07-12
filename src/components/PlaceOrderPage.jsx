import React, { useState } from 'react';
import axios from 'axios';
import './PlaceOrderPage.css';

const PlaceOrderPage = ({ cartItems, setShowPlaceOrderPage }) => {
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [tableNo, setTableNo] = useState('');

  const handleSubmitOrder = async (event) => {
    event.preventDefault();

    const orderData = {
      name,
      whatsapp,
      tableNo,
      items: cartItems.map(item => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
    };

    console.log('Order data to be sent:', orderData);
    console.log('Environment Variable:', import.meta.env.VITE_APP_BASE_CUSTOMER_BACKEND_API);

    try {
      console.log('Attempting to send order data to backend...');
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BASE_CUSTOMER_BACKEND_API}/orders`,
        orderData,
        { headers: { 'Content-Type': 'application/json' } }
      );
      console.log('Order saved:', response.data);
      alert('Order placed successfully!');
      setShowPlaceOrderPage(false); // Close the order page
    } catch (error) {
      console.error('Error saving order:', error);
      if (error.response) {
        console.log('Error data:', error.response.data);
        console.log('Error status:', error.response.status);
        console.log('Error headers:', error.response.headers);
      } else if (error.request) {
        console.log('Error request:', error.request);
      } else {
        console.log('Error message:', error.message);
      }
      alert('Failed to place the order. Please try again.');
    }
  };

  return (
    <div className="place-order-container">
      <h2 className="place-order-title">Place Your Order</h2>
      <form className="place-order" onSubmit={handleSubmitOrder}>
        <label htmlFor="tableNo">Table Number:</label>
        <input
          type="text"
          id="tableNo"
          name="tableNo"
          required
          value={tableNo}
          onChange={(e) => setTableNo(e.target.value)}
        />

        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="whatsapp">WhatsApp Number:</label>
        <input
          type="text"
          id="whatsapp"
          name="whatsapp"
          required
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
        />

        <button type="submit" className="place-order-button">Submit Order</button>
      </form>
      <button className="back-button" onClick={() => setShowPlaceOrderPage(false)}>Back to Cart</button>
    </div>
  );
};

export default PlaceOrderPage;
