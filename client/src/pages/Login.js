import React, {useRef, useState, useContext, useEffect} from "react";
import {useHistory} from "react-router-dom";
import API from "../utils/API";
import {StoreContext} from "../utils/context";

function Login(){
     const history = useHistory();
     const emailInput = useRef();
     const passwordInput = useRef();
     const [response, setResponse] = useState('');
     const {currentUser, setUser} = useContext(StoreContext);

     useEffect(()=>{
          if(currentUser.username){
               const url = `/home/${currentUser.username}`;
               history.push(url);
          }
     }, [currentUser]);

     /*Sends the user input to the server to facilitate login*/
     function submitLogin(email, password){
          const user = {
               email:email,
               password:password
          };
          API.login(user)
          .then((response)=>{
               if(response){
                    if(response.data.response){
                         setResponse(response.data.response);
                         if(response.data.action === "clear all"){
                              emailInput.current.value = "";
                              passwordInput.current.value = "";
                         }else if(response.data.action === "clear password"){
                              passwordInput.current.value = "";
                         }
                    }else if(response.data.user[0]){
                         const newUser = response.data.user[0];
                         setUser(newUser);
                    }
               }else{
                    passwordInput.current.value = "";
               }
          }).catch(err=>console.log(err));
          // API.getUsers().then(response=>console.log(response)).catch(err=>console.log(err));
     }

     return(
          <div>
               <h5>Login</h5>
               {response ? <p>{response}</p> : <span></span>}
               <form onSubmit={()=>submitLogin(emailInput.current.value, passwordInput.current.value)}>
                    <label htmlFor="emailInput">Email:</label>
                    <br/>
                    <input href id="emailInput" name="emailInput" ref={emailInput} placeholder="johnDoe1234@gmail.com"
                    // onkeypress={(e)=>clickPress(e)}
                    ></input>
                    <br/>
                    <br/>
                    <label htmlFor="passwordInput">Password:</label>
                    <br/>
                    <input id="passwordInput" name="passwordInput" ref={passwordInput} type="password" placeholder="ps1234"
                    // onkeypress={(e)=>clickPress(e)}
                    ></input>
                    <br/>
                    <input type="button" value="login" onClick={()=>{
                         submitLogin(emailInput.current.value, passwordInput.current.value);
                         
                    }}></input>
               </form>
               <button href onClick={()=>history.push('/signup')}>Don't have an account?</button>
          </div>
     );
}

export default Login;