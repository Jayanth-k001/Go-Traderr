import React, { useContext } from 'react'
import "./header.css"
import Avatar from '@mui/material/Avatar';
import { LoginContext } from './context';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import trad from "./trad.png"
import logo from '../logo.svg'


export const Header = () => {

    const { logindata, setLoginData } = useContext(LoginContext);
    const history = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const logout = async () => {
        let token = localStorage.getItem("usersdatatoken");

        const res = await fetch("http://localhost:8000/logout", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token,
                Accept: "application/json"
            },
           
        });

        const data = await res.json();
        console.log(data);

        if (data.status === 201) {
            console.log("use logout");
            localStorage.removeItem("usersdatatoken");
            setLoginData(false)
            history("/");
        } else {
            console.log("error");
        }
    }

    const goDash = () => {
        history("/dash")
    }

    const goError = () => {
        history("*")
    }

    return (
        <>
            <header>
                <nav>
                    <h1 style={{color:"whitesmoke"}}>GoTraderr</h1>
                    <img src={trad} style={{height:"70px",width:"100px",marginRight:"1200px",marginTop:"20px"}}></img>
                </nav>
            </header>


        </>
    )
}