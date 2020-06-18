import React, { useEffect } from 'react'
import './App.css'
import { Provider } from 'react-redux'
import store from './store'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Header from './components/Header'
import Infos from './components/Infos'
import Notes from './components/Notes'
import { authUser } from './actions/users'

function App() {
  useEffect(() => {
    function loadUser() {
      store.dispatch(authUser())
    }
    loadUser()
  }, [])
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Notes} />
            <Route exact path="/info" component={Infos} />
          </Switch>
        </div>
        <ToastContainer />
      </Router>
    </Provider>
  )
}

export default App
