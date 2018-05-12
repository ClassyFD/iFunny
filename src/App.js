import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Landing from './Components/Landing/Landing';
import Header from './Components/Header/Header';
import MemeEditing from './Components/MemeEditing/MemeEditing';
import Cam from './Components/Cam/Cam';
import Profile from './Components/Profile/Profile';
import Collective from './Components/Collective/Collective';
import './App.css';

class App extends Component {
  render() {
    return (
        <main className="App">
          <Header/>
          <Switch>
            <Route exact path='/' render={()=>{
              return (
                <Redirect to='/app'/>
              )
            }} />
            <Route path='/app' component={Landing}/>
            <Route path='/edit' component={MemeEditing}/>
            <Route path='/cam' component={Cam}/>
            <Route path='/profile' component={Profile}/>
            <Redirect from='*' to='/404'/>
          </Switch>
        </main>
    );
  }
}

export default App;
