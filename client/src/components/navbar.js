import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom'
import Avatar from '@mui/material/Avatar';
import { LoginContext } from './context';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import trad from './trad.png'
import axios from 'axios'

export const Navbar = () => {
    const handleOptionClick = (option) => {
        history(`/home?query=${option}`);
    };
    const { logindata, setLoginData } = useContext(LoginContext);
    const [query, setQuery] = useState('');
    const history = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const options = {
        method: 'GET',
        url: 'https://alpha-vantage.p.rapidapi.com/query',
        params: {
            keywords: `${query}`,
            function: 'SYMBOL_SEARCH',
            datatype: 'json'
        },
        headers: {
            'X-RapidAPI-Key': '1655a8f34bmsh056234229340566p1a60a1jsn002269f555a2',
            'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com'
        }
    };

    const handleSearch = async () => {
        try {
            const response = await axios.request(options);

            let symbol = response.data.bestMatches["1"] ? response.data.bestMatches["1"]["1. symbol"] : response.data.bestMatches["0"]["1. symbol"];
            var symbolWithoutBSE = symbol.replace(/\..+$/, "");
            history(`/display?query=${symbolWithoutBSE}`);
        } catch (error) {
            alert(error + "\nReload the page");
            history(`/home?query=NIFTY 50`);

        }

    }

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

    const his = () => {
        history('/transhis');
    }

    return (
        < nav className="navbar navbar-expand-lg navbar-light bg-first " >
            <div className="container-fluid">
                <div className="header">
                    <div className="logo" style={{ marginLeft: "30px" }}>
                        <h1 style={{ color: "white" }}>GoTraderr</h1>
                        <img src={trad} alt="GoTraderr Logo" style={{ height: "60px", width: "90px" }} />
                    </div>
                </div>
                <button className="navbar-toggler" type="button" style={{ background: "white" }} data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item" ><Link className="nav-link h5 active" to={`/home?query=${"NIFTY 50"}`} style={{ color: "whitesmoke", marginLeft: "60px", fontSize: "23px" }}>Home</Link></li>
                        <li class="nav-item dropdown" style={{ marginLeft: "20px" }}>
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ color: "white", fontSize: "20px" }}>
                                Stock Indices
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><button class="dropdown-item" onClick={() => handleOptionClick("NIFTY 50")}>NIFTY 50</button></li>
                                <li><button class="dropdown-item" onClick={() => handleOptionClick("NIFTY NEXT 50")}>NIFTY NEXT 50</button></li>
                                <li><button class="dropdown-item" onClick={() => handleOptionClick("NIFTY 100")}>NIFTY 100 </button></li>
                                <li><button class="dropdown-item" onClick={() => handleOptionClick("NIFTY 200")}>NIFTY 200 </button></li>
                                <li><button class="dropdown-item" onClick={() => handleOptionClick("NIFTY 500")}>NIFTY 500</button></li>
                                <li><button class="dropdown-item" onClick={() => handleOptionClick("NIFTY MIDCAP 50")}>NIFTY MIDCAP 50</button></li>
                                <li><button class="dropdown-item" onClick={() => handleOptionClick("NIFTY MIDCAP 100")}>NIFTY MIDCAP 100</button></li>
                                <li><button class="dropdown-item" onClick={() => handleOptionClick("NIFTY SMLCAP 50")}>NIFTY SMLCAP 50</button></li>
                                <li><button class="dropdown-item" onClick={() => handleOptionClick("NIFTY SMLCAP 100")}>NIFTY SMLCAP 100</button></li>
                                <li><button class="dropdown-item" onClick={() => handleOptionClick("NIFTY BANK")}>NIFTY BANK</button></li>
                                <li><button class="dropdown-item" onClick={() => handleOptionClick("NIFTY AUTO")}>NIFTY AUTO</button></li>
                                <li><button class="dropdown-item" onClick={() => handleOptionClick("NIFTY FINSRV25 50")}>NIFTY FINSRV25 50</button></li>
                                <li><button class="dropdown-item" onClick={() => handleOptionClick("NIFTY FIN SERVICE")}>NIFTY FIN SERVICE</button></li>
                                <li><button class="dropdown-item" onClick={() => handleOptionClick("NIFTY IT")}>NIFTY IT</button></li>
                                <li><button class="dropdown-item" onClick={() => handleOptionClick("NIFTY MEDIA")}>NIFTY MEDIA</button></li>
                                <li><button class="dropdown-item" onClick={() => handleOptionClick("NIFTY METAL")}>NIFTY METAL</button></li>
                                <li><button class="dropdown-item" onClick={() => handleOptionClick("NIFTY INFRA")}>NIFTY INFRA</button></li>
                                <li><button class="dropdown-item" onClick={() => handleOptionClick("NIFTY ENERGY")}>NIFTY ENERGY</button></li>
                                <li><button class="dropdown-item" onClick={() => handleOptionClick("NIFTY PHARMA")}>NIFTY PHARMA</button></li>
                                <li><button class="dropdown-item" onClick={() => handleOptionClick("NIFTY PSU BANK")}>NIFTY PSU BANK</button></li>
                                <li><button class="dropdown-item" onClick={() => handleOptionClick("NIFTY PVT BANK")}>NIFTY PVT BANK</button></li>


                            </ul>
                        </li>



                    </ul>
                    <div className="d-flex">
                        <input className="form-control me-2" style={{ width: "70%", paddingLeft: "10px", paddingRight: "30px",color:"black" }} onKeyDown={(e) => {
                            e.keyCode === 13 && e.shiftKey === false && handleSearch();
                        }} type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search with keywords" aria-label="Search" />
                        <button className="btn btn-outline bg-secondary  me-4" style={{ width: "30%", paddingLeft: "5px", paddingRight: "15px",color:"black" }} type="submit" onClick={handleSearch}>Search</button>
                    </div>

                    <div className='avtar' style={{ marginRight: "30px" }}>

                        {
                            logindata.ValidUserOne ? <Avatar style={{ background: "grey", fontWeight: "bold", textTransform: "capitalize" }} onClick={handleClick} >{logindata.ValidUserOne.name[0].toUpperCase()}</Avatar> :
                                <Avatar style={{ background: "blue" }} onClick={handleClick} />
                        }
                    </div>
                    <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose} MenuListProps={{ 'aria-labelledby': 'basic-button', }}  >
                        {
                            logindata.ValidUserOne ? (
                                <>
                                    <MenuItem onClick={() => {
                                        goDash()
                                        handleClose()
                                    }}>Your Portfolio</MenuItem>
                                    <MenuItem onClick={() => {
                                        goDash()
                                        handleClose()
                                        his()
                                    }}>Transaction history</MenuItem>
                                    <MenuItem onClick={() => {
                                        logout()
                                        handleClose()
                                    }}>Logout</MenuItem>
                                </>
                            ) : (
                                <>
                                    <MenuItem onClick={() => {
                                        handleClose()
                                    }}>Profile</MenuItem>
                                </>
                            )
                        }
                    </Menu>
                </div>
            </div>
        </nav >
    )


}