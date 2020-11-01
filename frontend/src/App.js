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
import User from './components/User'
import Chat from './components/Chat'

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
            <Route exact path="/" children={<Notes />} />
            <Route exact path="/info" children={<Infos />} />
            <Route exact path="/chat" children={<Chat />} />
            <Route exact path="/user" children={<User />} />
          </Switch>
        </div>
        <ToastContainer />
      </Router>
    </Provider>
  )
}

export default App
