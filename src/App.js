import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Landing from './Components/Landing/Landing';
import Header from './Components/Header/Header';
import MemeEditing from './Components/MemeEditing/MemeEditing';
import Missing from './Components/Missing/Missing';
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
            <Route path='/404' component={Missing}/>
            <Redirect from='*' to='/404' component={Missing}/>
          </Switch>
        </main>
    );
  }
}

export default App;
