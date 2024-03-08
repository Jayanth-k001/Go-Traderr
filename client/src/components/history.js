import React, { useEffect, useState, useContext } from 'react'
import { Navbar } from './navbar'
import { LoginContext } from './context';
import './header.css'
import { collapseClasses } from '@mui/material';



export const Transhis = () => {
    const [transactions, setTransactions] = useState([]);
    const { logindata, setLoginData } = useContext(LoginContext);
    const email = logindata.ValidUserOne.email;

    useEffect(() => {
        fetchstock()
    }, []);

    const fetchstock = async () => {
        const data = await fetch(`http://localhost:8000/transhis/${email}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },

        });
        let res = await data.json();
        setTransactions(res.data.history);
    }
    return (
        <>
            <Navbar />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1rem', color: "white", borderRadius: '5px' }}>
                <h1>Transaction History</h1>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1rem', color: 'white', width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>

                <table style={{ borderCollapse: 'collapse', width: '100%', color: 'white', borderCollapse: "collapse" }}>
                    <thead>
                        <tr style={{ border: '1px solid white' }}>
                            <th className="table-cell">Stock Name</th>
                            <th className="table-cell">Price</th>
                            <th className="table-cell">Quantity</th>
                            <th className="table-cell">Total Amount</th>
                            <th className='table-cell'>Date & Time</th>
                            <th className='table-cell'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.length >0 ? transactions.sort((a, b) => new Date(b.formattedDate) - new Date(a.formattedDate)).map((transaction, index) => (
                            <tr key={index} style={{ border: '1px solid white' }}>
                                <td className="table-cell">{transaction.name}</td>
                                <td className="table-cell">{transaction.price}</td>
                                <td className="table-cell">{transaction.quantity}</td>
                                <td className="table-cell">{transaction.totalAmount}</td>
                                <td className='table-cell'>{transaction.formattedDate}</td>
                                <td className='table-cell'>{transaction.action}</td>
                            </tr>
                        )): (
                            <tr>
                                <td colSpan="6"><h2>No transactions available</h2></td>
                            </tr>
                        )
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}
