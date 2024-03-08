import React, { useEffect } from 'react'
import { useState } from 'react';
import { useLocation } from 'react-router-dom'
import { Navbar } from "./navbar";
import { Stkdisplay } from './stkdisplay';
import { Spinner } from './loader';
import axios from 'axios';
import './header.css'

export const Home = () => {
  const [stocks, setstocks] = useState([]);
  const [loadingstate, setloading] = useState(false);
  const location = useLocation();
  const query1 = new URLSearchParams(location.search).get('query');
  const query2 = encodeURIComponent(query1);
  const query = query2.replace(/%20/g, " ");
  console.log(query);
  const options = {
    method: 'GET',
    url: 'https://latest-stock-price.p.rapidapi.com/price',
    params: {
      Indices: `${query}`
    },
    headers: {
      'X-RapidAPI-Key': '1655a8f34bmsh056234229340566p1a60a1jsn002269f555a2',
      'X-RapidAPI-Host': 'latest-stock-price.p.rapidapi.com'
    }
  };
  const fetchstock = async () => {
    setloading(true);
    try {
      const response = await axios.request(options);
      setloading(false);
      setstocks(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    fetchstock()
  }, [query]);


  return (
    <>
      <Navbar />
      <div className="welcome-container">
        <h1 style={{ fontStyle: 'italic' }}>Welcome to GoTraderr</h1>
        <br/>
        <h5> Your ultimate destination for honing your trading skills in a risk-free environment.</h5>
      </div>
      <div className="container my-4 text-center pt-20">
        <br></br>
        <br></br>
        <br></br>
        {loadingstate === true ? <Spinner /> : ""}
        <div className="row">
          {loadingstate === false && stocks.map((element) => {
            return (
              <div className="col-md-3" key={element.identifier}>
                <Stkdisplay
                  symbol={element.symbol}
                  open={element.open}
                  dayhigh={element.dayHigh}
                  daylow={element.dayLow}
                  price={element.lastPrice}
                  prevclose={element.previousClose}
                  change={element.change}
                  pchange={element.pChange}
                />
              </div>
            );
          })}

        </div>
      </div>
    </>
  )
}
