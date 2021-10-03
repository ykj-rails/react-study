import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Switch, Route, Link, BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'

import { store } from '../ts/stores'
import { Login } from './views/pages/Login'
import { Todo } from './views/pages/Todo'
import { TodoConfig } from './views/pages/TodoConfig'
import { Header } from './views/components/Header'

const App = () => (
  <Provider store={store}>
    <Router>
      <Header />
      <ul>
        <li>
          <Link to="/">Login</Link>
        </li>
        <li>
          <Link to="/todo">Todo</Link>
        </li>
        <li>
          <Link to="/todoconfig">Todoconfig</Link>
        </li>
      </ul>
      <Switch>
        <Route path="/todo">
          <Todo />
        </Route>
        <Route path="/todoconfig">
          <TodoConfig />
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </Router>
  </Provider>
)

ReactDOM.render(<App />, document.querySelector('#app'))
