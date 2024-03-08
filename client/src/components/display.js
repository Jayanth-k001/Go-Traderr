import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import CanvasJSReact from '@canvasjs/react-charts';
import { Navbar } from './navbar';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import "./header.css"


export const Display = () => {
  const [openp, setopen] = useState("");
  const [dayhigh, setdayhigh] = useState("");
  const [daylow, setdaylow] = useState("");
  const [prevclose, setprevclose] = useState("");
  const history=useNavigate();
  var CanvasJS = CanvasJSReact.CanvasJS;
  var api = "8CRQ1E4D3BKBP28G";
  var dps = [], data1 = [];
  var chart = null;
  var columns = ["Date", "Open", "High", "Low", "Close", "Volume"];
  const location = useLocation();
  const query1 = new URLSearchParams(location.search).get('query');
  const price1 = new URLSearchParams(location.search).get('price');
  const query2 = encodeURIComponent(query1);
  const price=encodeURIComponent(price1);
  let query = query2.replace(/%20/g, " ");
  query += ".BSE";

  const updateopen = (price) => {
    let roundedValue = parseFloat(price).toFixed(2);
    setopen(roundedValue);
  }
  const updatedayhigh = (price) => {
    let roundedValue = parseFloat(price).toFixed(2);
    setdayhigh(roundedValue);
  }
  const updatedaylow = (price) => {
    let roundedValue = parseFloat(price).toFixed(2);
    setdaylow(roundedValue);
  }
  const updateprevclose = (price) => {
    let roundedValue = parseFloat(price).toFixed(2);
    setprevclose(roundedValue);
  }

  const options = {
    method: 'GET',
    url: 'https://alpha-vantage.p.rapidapi.com/query',
    params: {
      function: 'TIME_SERIES_DAILY',
      symbol: `${query}`,
      outputsize: 'compact',
      datatype: 'json'
    },
    headers: {
      'X-RapidAPI-Key': '1655a8f34bmsh056234229340566p1a60a1jsn002269f555a2',
      'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com'
    }
  };

  const getting_data = async () => {

    try {
      if (query !== null) {
        const res = await axios.request(options);
        console.log(res.data);
        var date = res.data["Time Series (Daily)"]
        let a = 60;
        let b = 10;
        console.log(date);
        for (var d in date) {
          var r = d.split("-");
          if (a-- > 0) {
            var value = date[d];
            dps.unshift({ x: new Date(parseInt(r[0]), parseInt(r[1]) - 1, parseInt(r[2])), y: parseFloat(value["1. open"]) });
            if (b-- > 0) {
              let c = [d, value["1. open"], value["2. high"], value["3. low"], value["4. close"], value["5. volume"]];
              console.log(c);
              data1.push(c);
            }
          } else {
            break;
          }
        }
        updateopen(data1[0][1]);
        updatedayhigh(data1[0][2]);
        updatedaylow(data1[0][3]);
        updateprevclose(data1[0][4]);
        graph();
        drawTable();
        document.getElementById("loading_container").style.display = "none";
        document.getElementById("chartContainer").disabled = false;
      }
    } catch (error) {
      alert( "\n Couldn't load the details of Stock!! Try after sometime");
      history(`/home?query=${"NIFTY 50"}`);
    }


  }

  function graph() {
    chart = new CanvasJS.Chart("chartContainer", {
      title: {
        text: query
      },
      animationEnabled: true,
      theme: "light2",
      axisY: {
        title: "Open Prices",
        includeZero: false
      },
      axisX: {
        title: "Date",
        valueFormatString: "DD-MMM"
      },
      data: [{
        type: "line",
        indexLabelFontSize: 16,
        dataPoints: dps
      }]
    });
    chart.options.data[0].dataPoints = dps;
    chart.render();
  }
useEffect(()=>{
  getData()
},[]);
  function getData() {
    if (chart !== null) {
      chart.destroy();
    }
    data1 = [];
    dps = [];
    getting_data();
  }
 const onbuy=()=>{
  history(`/buy?price=${price}&name=${query}`);
 }
  function drawTable() {
    var table_container = document.getElementById("table_container");
    if (table_container.childNodes.length === 0) {
      var para = document.createElement("p");
      para.id = "para";
      var cell = document.createTextNode("RECENT END OF DAY PRICES");
      para.appendChild(cell);
      table_container.appendChild(para);
      var table = document.createElement("table");
      table.className = "table";
      table.style.borderColor = "1px solid white"; 
      var row = document.createElement("tr");
      for (let i = 0; i < columns.length; i++) {
        var col = document.createElement("th");
        col.scope = "col";
        cell = document.createTextNode(columns[i]);
        col.appendChild(cell);
        col.style.color = "white";
        row.appendChild(col);
      }
      table.appendChild(row);
      console.log(data1);
      for (let i = 0; i < 10; i++) {
        row = document.createElement("tr");
        for (let j = 0; j < 6; j++) {
          col = document.createElement("td");
          cell = document.createTextNode(data1[i][j]);
          col.appendChild(cell);
          col.style.color = "white";
          row.appendChild(col);
        }
        table.appendChild(row);
      }
      table_container.appendChild(table);
    }
  }



  return (
    <>
      <Navbar />
      <div id="loading_container">
        <h6 style={{ marginLeft: "11px" }}>Loading data.....</h6>
        <progress></progress>
      </div>
      <div id="company_container">

      </div>
      <button id="download_data" onclick="download()" class="btn btn-success"></button>
      <div id="chartContainer" ></div>
      <div style={{ display: 'flex', flexDirection: 'column', width: '75%', margin: '0 auto' ,backgroundColor:"black",marginTop:"30px",paddingTop:"20px",paddingBottom:"20px",paddingleft:"50px",alignItems:"center"}}>
        <div id="priceInfo" style={{ color: 'white', textAlign: 'center', display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
          <span id="openPrice" style={{ margin: '5px 20px' }}>Open:  &nbsp;<strong>₹{openp}</strong> </span>
          <span id="dayHigh" style={{ margin: '5px 20px' }}> High: &nbsp;<strong>₹{dayhigh}</strong> </span>
          <span id="dayLow" style={{ margin: '5px 20px' }}>Low:<strong> &nbsp;₹{daylow}</strong></span>
          <span id="prevClose" style={{ margin: '5px 20px' }}>Prev. Close: &nbsp;<strong>₹{prevclose}</strong> </span>
        </div>
        <div className='' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', height: '10px', width: '40px' }}>
          
          <button className='hover-card' style={{ backgroundColor:"#007bff",color:"white", position: 'absolute', top:20, right: 0 ,padding:"10px 50px",paddingRight:"70px",textAlign:"center"}} onClick={onbuy}>Buy</button>
        </div>
      </div>



      <div id="table_container" style={{ color: "whitesmoke", marginLeft: "70px"}} ></div>
    </>
  )
}
