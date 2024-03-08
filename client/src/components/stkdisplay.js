import React from 'react'
import "./header.css"
import { Link } from 'react-router-dom';

export const Stkdisplay = (props) => {
    let { symbol, open, dayhigh, daylow, price, prevclose, change, pchange } = props;
    console.log(open);
    const percentageColor = pchange > 0 ? 'green' : 'red';
    const changecolor = change > 0 ? 'green' : 'red';
    change=change.toFixed(2);
    pchange=pchange.toFixed(2);
    return (
        <>
            <div className="my-3">
                <Link to={`/display?query=${symbol}&price=${price}`} style={{ textDecoration: 'none', color: 'black' }}>
                    <div className="card hover-card rounded">
                        <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: '0' }}>
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">{symbol}</h5>
                            <div style={{ display: 'flex',flexWrap:"wrap" }}>
                                <h5 className="card-title" >₹{price}</h5>
                                <p className="card-title" style={{marginLeft:"60px", color: percentageColor}}>₹{change}</p>
                                <p className="card-title" style={{marginLeft:"10px", color: changecolor}}>| {pchange}%</p>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </>
    )
}
