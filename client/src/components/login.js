import React, { useState,useContext } from 'react'
import './both.css'
import { Link } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from './context';
import { Header } from './header';

export const Login = () => {
  const [show,setshow] =useState(false);
  const [input,setInput]=useState({
    email:"",
    password:""
  })
  const {logindata,setLoginData}=useContext(LoginContext);

  const his=useNavigate();

const setVal=(e)=>{
    const {name,value}=e.target;

    setInput(()=>{
        return {...input,[name]:value}
    })
}

const DashboardValid = async () => {
    let token = localStorage.getItem("usersdatatoken");

    const res = await fetch("http://localhost:8000/validuser", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        }
    });

    const data = await res.json();
    if (data.status === 401 || !data) {
       his("*");
    } else {
        console.log("user verify");
        setLoginData(data);
        let query="NIFTY 50"
        his(`/home?query=${query}`);
    }
}

const addData =async(e) => {
    e.preventDefault();

    const { email, password } = input;

    if (email === "") {
        toast.error("email is required!", {
            position: "top-center"
        });
    } else if (!email.includes("@")) {
        toast.warning("include @ in your email!", {
            position: "top-center"
        });
    } else if (password === "") {
        toast.error("password is required!", {
            position: "top-center"
        });
    } else if (password.length < 6) {
        toast.error("password must be 6 char!", {
            position: "top-center"
        });
    }
    else{
        const data=await fetch('http://localhost:8000/login',{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({
                email, password
            })
        })
            
           const res=await data.json();
           if(res.status === 201){
            localStorage.setItem("usersdatatoken",res.result.token);
            DashboardValid();
            setInput({...input,email:"",password:""});
        }
        else{
            toast.success("It seems you haven't Registered! Plz Signup 😃!", {
                position: "top-center"
            })
        }
        
    }
  };
    return (
        <>
        <section >
            <Header/>
            <div className='form_data' >
                <div className='form_heading'>
                    <h1>Welcome Back,  Login in</h1>
                    <p> Hi,we are glad to have you back</p>
                </div>
                <form>
                    <div className='form_input'>
                        <label htmlFor='email'>Email</label>
                        <input type='email' name='email' id='email' onChange={setVal} value={input.email} placeholder='Enter Your Email Address'></input>
                    </div>
                    <div className="form_input">
                        <label htmlFor="password">Password</label>
                        <div className="two">
                            <input type={!show ? "password" : "text"} name="password" value={input.password} onChange={setVal} id="password" placeholder='Enter Your password' />
                            <div className="showpass" onClick={()=> setshow(!show)}>
                                {!show? "show" :"Hide"}
                            </div>
                        </div>
                    </div>
                    <button className='button' onClick={addData}>Login</button>
                    <p>Don't have an Account?<Link to='/register'><strong> Sign Up</strong></Link></p>
                </form>
                <ToastContainer/>
            </div>
        </section>
        </>
    )
}

