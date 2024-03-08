import React from 'react'
import { useNavigate } from 'react-router-dom';
import './header.css'

export const Portdisplay = (props) => {
  let { name, price, quantity, totalAmount } = props;
  const his=useNavigate();
   const onSell=()=>{
      his(`/sell?price=${price}&name=${name}&quantity=${quantity}`)
   }
  return (
    <>
      <div className="my-3">
       
          <div className="card hover-card rounded">
            <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: '0' }}>
            </div>
            <div className="card-body">
              <h5 className="card-title">{name}</h5>
              <div style={{ display: 'flex', flexWrap: "wrap" }}>
                <p className="card-title" >Avg. Price: &nbsp;<strong>₹{price}</strong></p>
                <p className="card-title" style={{marginLeft:"20px"}}>Purchase Val.: &nbsp;<strong>₹{totalAmount}</strong></p>
                <p className="card-title" style={{ marginLeft: "10px" }}>Quantity: <strong>{quantity}</strong></p>
              </div>
              <button style={{width:"160px",display:"inline-block",padding:"10px 20px"}} onClick={onSell}>Sell</button>
            </div>
          </div>
      </div>
    </>
  )
}
