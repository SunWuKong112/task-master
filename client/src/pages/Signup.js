import React, {useRef, useState} from "react";
import {useHistory} from 'react-router-dom';
import API from "../utils/API";

function Signup(){
     const history = useHistory();
     const usernameInput = useRef();
     const emailInput = useRef();
     const passwordInput = useRef();
     const [response, setResponse] = useState('');

     // Sends the user input to the server to facilitate signup
     function submitSignUp(username, email, password){
          const newUser = {
               username:username,
               email:email,
               password:password
          };
          API.signUp(newUser)
          .then((response)=>{
               setResponse(response.data.response);
               if(response.data.action === "clear all"){
                    usernameInput.current.value = "";
                    emailInput.current.value = "";
                    passwordInput.current.value = "";
               }else if(response.data.action === "clear password"){
                    passwordInput.current.value = "";
               }
          })
          .catch(err=>console.log(err));
          // API.getUsers().then(response=>console.log(response)).catch(err=>console.log(err));
     }

     return(
          <div>
               <h5>Sign up</h5>

               {/* Displays feedback to the user regarding the success of the sign up process */}
               {response ? <p>{response}</p> : <span></span>}
               <form>
                    <label htmlFor="username-input">Username:</label>

                    <br/>

                    <input id="username-input" name="username-input" ref={usernameInput} placeholder="johnDoe1234"></input>

                    <br/>

                    <label htmlFor="email-input">Email:</label>

                    <br/>

                    <input id="email-input" name="email-input" ref={emailInput} placeholder="johndoe@gmail.com"></input>

                    <br/>

                    <label htmlFor="password-input">password:</label>

                    <br/>

                    <input type="password" id="password-input" name="password-input" ref={passwordInput} placeholder="password123"></input>

                    <br/>

                    <input id="sign-up-button" name="sign-up-button" type="button" value="Sign up" onClick={()=>submitSignUp(usernameInput.current.value, emailInput.current.value, passwordInput.current.value)}></input>
               </form>
               <button href onClick={()=>history.push('/login')}>Already have an account?</button>
          </div>
          
     );
}

export default Signup;