import React from 'react';
import {useHistory} from 'react-router-dom';

function Splash(){
     const history = useHistory();
     return(
          <div>
               <h5>Welcome to Task Master</h5>
               <br/>
               <button href onClick={()=>history.push('/login')}>Log in</button>
               <button href onClick={()=>history.push('/signup')}>Sign up</button>
          </div>
     );
}

export default Splash;