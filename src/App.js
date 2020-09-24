import React from 'react';
/*import logo from './logo.svg';*/
import './App.css';
import Login from './component/Login'
import Forget from './component/Forget'
import Reset from './component/Reset'
import Hello from './component/Hello'
import Testmap from './component/Testmap'
import Map from './component/Map'
import {Route, Switch} from "react-router-dom";
function App() {
  return (

   <div className="App" >
<Switch>
 <Route path='/' exact component={Login}/>
 <Route path='/forget' component={Forget}/>
  <Route path='/Reset' component={Reset}/>
  <Route path='/hello' exact component={Hello}/>
    <Route path='/map' exact component={Map}/>
       <Route path='/testmap' exact component={Testmap}/>
</Switch>
   </div>

  );
}
export default App;
