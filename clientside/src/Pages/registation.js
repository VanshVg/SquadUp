import React from 'react'
import { useState, useEffect } from 'react';
import isValidEmail from '../modules/emailValidation';
import isValidPassword from '../modules/passwordValidation';

export default function Registration() {
  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const [emailClass, setEmailClass] = useState("");
  const [emailValue, setEmailValue] = useState("")
  useEffect(()=>{
    if(emailValue.length === 0) {
      setEmailClass("")
    } else if(isValidEmail(emailValue)) {
      setEmailClass("text-success")
    } else {
      setEmailClass("text-danger")
    }
  }, [emailValue])
  
  const [passClass, setPassClass] = useState("")
  const [passValue, setPassValue] = useState("")
  useEffect(()=> {
    if(passValue.length === 0) {
      setPassClass("")
    } else if(isValidPassword(passValue)) {
      setPassClass("text-success")
    } else {
      setPassClass("text-danger")
    }
  }, [passValue])
  
  const [cPassValue, setCPassValue] = useState("")
  const [cPassClass, setCPassClass] = useState("")
  useEffect(()=> {
    if(cPassValue.length === 0) {
      setPassClass("")
    } else if(passValue === cPassValue) {
      setCPassClass("text-success")
    } else {
      setCPassClass("text-danger")
    }
  }, [cPassValue])

  return (
    <div className="p-5">
      <form onSubmit = {handleSubmit} className= 'm-5 mt-0'>
        <div className="mb-3">
          <label className="form-label">User Name</label>
          <input type="text" className="form-control" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input value={emailValue} onChange={e=>setEmailValue(e.target.value)} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input value={passValue} onChange={e=>setPassValue(e.target.value)} type="password" className="form-control" id="exampleInputPassword1" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword2" className="form-label">Confirm Password</label>
          <input value={cPassValue} onChange={e=>setCPassValue(e.target.value)} type="password" className="form-control" id="exampleInputPassword2" />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        <ul>
          <li>
            <div className= {emailClass}>Enter a valid email id</div>
          </li>
          <li>
            <div className= {passClass}>Length of the password must be 8-15 character, Must have atleast 1 Uppercase, 1 Lowercase, 1 digit and 1 special character</div>
          </li>
          <li>
            <div className= {cPassClass}>Password and Confirm Password should be equal</div>
          </li>
        </ul>
      </form>
    </div>
  )
}
