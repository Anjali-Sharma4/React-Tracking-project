import React from 'react';
/*import logo from './logo.svg';*/
import './App.css';
import Login from './component/Login'
import Forget from './component/Forget'
import Reset from './component/Reset'
import Hello from './component/Hello'

import {Route, Switch} from "react-router-dom";
function App() {
  return (

   <div className="App" >
<Switch>
 <Route path='/' exact component={Login}/>
 <Route path='/forget' component={Forget}/>
  <Route path='/Reset' component={Reset}/>
  <Route path='/hello' exact component={Hello}/>
</Switch>
   </div>

  );
}
export default App;