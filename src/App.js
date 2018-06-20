import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Landing from './Components/Landing/Landing';
import Header from './Components/Header/Header';
import MemeEditing from './Components/MemeEditing/MemeEditing';
import Cam from './Components/Cam/Cam';
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
            <Redirect from='*' to='/404'/>
          </Switch>
        </main>
    );
  }
}

export default App;
