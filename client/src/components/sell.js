import React, { useState, useContext, useEffect } from 'react';
import { Navbar } from './navbar';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from './context';
import { useLocation } from 'react-router-dom';
import './header.css';



export const Sell = () => {
  const his = useNavigate();
  const { logindata, setLoginData } = useContext(LoginContext);
  const email = logindata.ValidUserOne.email;
  const location = useLocation();
  const price1 = new URLSearchParams(location.search).get('price');
  const name1 = new URLSearchParams(location.search).get('name');
  const quantity1=new URLSearchParams(location.search).get('quantity');
  const name = encodeURIComponent(name1);
  const sprice = encodeURIComponent(price1);
  const quantityLimit=encodeURIComponent(quantity1);
  const [quantity, setQuantity] = useState(quantityLimit);
  const [price, setPrice] = useState(sprice);
  const [totalAmount, setTotalAmount] = useState(quantity * price);
  const [balance, setbalance] = useState(900000);
  useEffect(() => {
    getcash()
  }, []);
  const getcash = async () => {
    const res = await fetch(`http://localhost:8000/getcash/${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });
    let data = await res.json();
    console.log(data.data.balance);
    setbalance(data.data.balance);
  }

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    setQuantity(newQuantity);
    calculateTotalAmount(newQuantity, price);
};

const handlePriceChange = (e) => {
    const newPrice = parseFloat(e.target.value);
    setPrice(newPrice);
    calculateTotalAmount(quantity, newPrice);
};

const calculateTotalAmount = (quantity, price) => {
    setTotalAmount(quantity * price);
};

const handleConfirmBuy =async () => {
    if(quantityLimit>=quantity){
    const data1 = await fetch('http://localhost:8000/sell', {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
           email, name, price, quantity, totalAmount,balance
        })
    })
    const res1=await data1.json();
    if(res1.status === 201){
       alert(`Stock ${name} of quantity ${quantity} is successfully sold`);
       his(`/home?query=NIFTY 50`);
 }
 else{
     alert("insucess to sell");
 }}
 else {
    alert(`Insufficient stocks!! Check the quantity of stocks you have!!`);
 }
};


  return (
    <>
       <Navbar />
            <div className="buy-stock-container" style={{ color: "white" }}>
                <h2>Stock : {name}</h2>
                <div className="cash-balance" style={{ color: "white" }}>Cash Balance: {balance}</div>
                <div className="buy-form">
                    <label htmlFor="quantity" >Quantity:</label>
                    <input
                        type="number"
                        id="quantity"
                        value={quantity}
                        onChange={handleQuantityChange}
                    />
                    <label htmlFor="price" >Price:</label>
                    <input
                        type="number"
                        id="price"
                        step="0.01"
                        value={price}
                        onChange={handlePriceChange}
                        readOnly
                    />
                    <label htmlFor="total-amount" >Total Amount:</label>
                    <input
                        type="text"
                        id="total-amount"
                        value={totalAmount.toFixed(2)}
                        readOnly
                    />
                </div>
                <button onClick={handleConfirmBuy}>Sell</button>
            </div>
    </>
  )
}
