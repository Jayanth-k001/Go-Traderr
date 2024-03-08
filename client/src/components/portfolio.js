import React, { useContext, useEffect, useState } from 'react';
import { Navbar } from './navbar'
import { LoginContext } from './context';
import profile from './profile.jpg';
import { Portdisplay } from './portdisplay';
import './styles.css'

export const Portfolio = () => {
  const { logindata, setLoginData } = useContext(LoginContext);
  const [stocks, setstocks] = useState([]);
  const [balance,setbalance]=useState(0);
  const email = logindata.ValidUserOne.email;
  const name = logindata.ValidUserOne.name;
  const investamt=100000-balance;
  useEffect(() => {
    portstock();
    getcash();
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
  const portstock = async () => {
    const data = await fetch(`http://localhost:8000/getstocks/${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },

    });
    let res = await data.json();
    console.log(res);
     setstocks(res.data.stocks);
  }

  return (
    <>
      <Navbar />
      <div className="cont" style={{ color: "white" }}>
        <div className="left" style={{paddingLeft:"20px",paddingTop:"20px"}}>
          <h4>Profile</h4>
          <img src={profile} alt='Profile' style={{ maxWidth: "100%", height: "auto", width: "250px" }} />
          <h5>Name:&nbsp;&nbsp; <strong>{name}</strong></h5>
          <h5>Email:&nbsp;&nbsp;<strong>{email}</strong></h5>
        </div>
        <div className="right">
          <div className="right-top">
            <div style={{ textAlign: "center" }}>
              <h1>Stocks</h1>
              <p>Portfolio Value</p>
              <h4>₹100000</h4>
            </div>
            <div style={{ backgroundColor: "grey", width: "40%", margin: "0 auto", textAlign: "center", color: "black" }}>
              <h4>Invested Amount : ₹ {investamt}</h4>
              <br />
              <h4>Cash Balance : ₹ {balance}</h4>
            </div>
            <div className="container my-2 text-center pt-40">
              <br></br>
              <br></br>
              <br></br>
              <div className="row">
                { stocks.length >0 ? stocks.map((element) => {
                  return (
                    <div className="col-md-5" key={element.name}>
                      <Portdisplay
                        name={element.name}
                        price={element.price}
                        quantity={element.quantity}
                        totalAmount={element.totalAmount}
                      />
                    </div>
                  );
                }): ""}

              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

