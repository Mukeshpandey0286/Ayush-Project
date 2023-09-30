import React from "react";
import "./login.css"
import { useState } from "react";
import axios from "axios";
import {toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from "react-router-dom"
const Login = () => {

const [name, setName] = useState();
const [email, setEmail] = useState();
const [password, setPassword] = useState();
const [confirmPassword, setConfirmPassword] = useState();

const navigate = useNavigate();


// Login user 


const handleLogin = async(e) =>{
        
  e.preventDefault();
 try {
  await axios.post("http://127.0.0.1:5000/api/v1/login",{
    email,password
  },{headers: {'Content-Type': 'application/json'}})
  .then((res) => {
    if (res.data.success) {
        navigate("/");
        toast.success("Login Succesful");
    }
    else{
    toast.error("Login Failed!");
    }
if(!email || !password){
toast.warning("Doesn't match!");
}
  })
 .catch((err) => {
   toast.error("Something went wrong!");
  console.log(err.message);
 })
 } catch (error) {
  console.log(error);
 }
}

// Register user

const registerHandler = async(e)=>{
try {
  e.preventDefault();

  if(!name|| !email || !password){
     return toast.warning("Fill all feilds!");
  }

    const {data} = await axios.post("http://127.0.0.1:5000/api/v1/register", {
      name,  
      email,
      password,
      confirmPassword 
    }, {headers: {'Content-Type': 'application/json'}});
  //   console.log(data);
  if(data.success){
    navigate("/");
    alert("Signup successfully")
    return toast.success("Signup successfully");
  } 
  else{
    return toast.error("Something went wrong");
  }
    } 

    catch (error) {
      toast.error("An error occurred during signup. Please try again later.");
    console.log(error.message);
}

}

  return (
    <>
    <div className="body">
      <div className="wrapper">
  <div className="card-switch">
    <label className="switch">
      <input type="checkbox" className="toggle" />
      <span className="slider" />
      <span className="card-side" />
      <div className="flip-card__inner">
        <div className="flip-card__front">
          {/* Login */}
          <div className="title">Log in</div>
          <form className="flip-card__form" action>
            <input className="flip-card__input" name="email" placeholder="Email" onChange={(e)=>(setEmail(e.target.value))}type="email" />
            <input className="flip-card__input" name="password" placeholder="Password" onChange={(e)=>(setPassword(e.target.value))} type="password" />
            <button className="flip-card__btn" onClick={handleLogin}>Let`s go!</button>
          </form>
        </div>
        {/* Register */}
        <div className="flip-card__back">
          <div className="title">Sign up</div>
          <form className="flip-card__form" action>
            <input className="flip-card__input" placeholder="Name" type="name" onChange={(e)=>(setName(e.target.value))}/>
            <input className="flip-card__input" name="email" placeholder="Email" type="email" onChange={(e)=>(setEmail(e.target.value))}/>
            <input className="flip-card__input" name="password" placeholder="Password" onChange={(e)=>(setPassword(e.target.value))} type="password" />
            <input className="flip-card__input" name="confirmPassword" placeholder="Confirm Password" onChange={(e)=>(setConfirmPassword(e.target.value))} type="password" />
           
            <button className="flip-card__btn" onClick={registerHandler}>Confirm!</button>
          </form>
        </div>
      </div>
    </label>
  </div>
</div>
</div>

    </>
  );
};

export default Login;
