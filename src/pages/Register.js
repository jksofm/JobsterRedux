import React from "react";
import styled from "styled-components";
import { Logo } from "../components";
import { useState, useEffect } from "react";
import { FormRow } from "../components";
import {toast} from "react-toastify";
import {useSelector,useDispatch} from "react-redux";
import { loginUser, registerUser } from "../features/user/userSLice";
import {useNavigate} from "react-router-dom";
const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};
function Register() {
  const [values, setValues] = useState(initialState);
const dispatch = useDispatch();
const Navigate = useNavigate();

const {user,isLoading} = useSelector((store)=>store.user)
 
useEffect(()=>{
  if(user){

    setTimeout(() => {
       Navigate('/')
    }, 2000);
  }
},[user])

  const handleChange = (e) => {
    
    setValues({...values,[e.target.name] : e.target.value})
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const {name, email, password, isMember } = values;
    // Thiếu name nhưng isMember vẫn true thì không lọt vào case này
    if(!email || !password || (!isMember && !name)){
      toast.error("Please fill out all fields");
      return;
      
    }
    if(isMember){
      dispatch(loginUser({email:email,password:password}));
      return;

    }
    dispatch(registerUser({email,name,password})); 

  };
  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };


  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? "Login" : "Register"}</h3>
       {!values.isMember && (
         <FormRow
         type="text"
         name="name"
         value={values.name}
         handleChange={handleChange}
       />
       )}
        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />

        <button disabled={isLoading} type="submit" className="btn btn-block">
          {isLoading?"Loading..." : "Submit"}
        </button>
        <p>
          {values.isMember ? "Not a member yet?" : "Already a member?"}

          <button type="button" onClick={toggleMember} className="member-btn">
            {values.isMember ? "Register" : "Login"}
          </button>
          <button
          type="button"
          className="btn btn-block btn-hipster"
          disabled={isLoading}
          onClick={()=>{
            dispatch(loginUser({email: "testUser@test.com",password: "secret"}));
          }}
          >
            {isLoading? "Loading..." : "Demo"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
}

export default Register;

const Wrapper = styled.section`
  display: grid;
  align-items: center;
  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 1.38rem;
  }
  .form {
    max-width: 400px;
    border-top: 5px solid var(--primary-500);
  }

  h3 {
    text-align: center;
  }
  p {
    margin: 0;
    margin-top: 1rem;
    text-align: center;
  }
  .btn {
    margin-top: 1rem;
  }
  .member-btn {
    background: transparent;
    border: transparent;
    color: var(--primary-500);
    cursor: pointer;
    letter-spacing: var(--letterSpacing);
  }
`;
