import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {
  Switch,
  Route,
  Link,
  Redirect,
  BrowserRouter as Router,
} from 'react-router-dom'
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
        {false && (
          <li>
            <Link to="/todo">Todo</Link>
          </li>
        )}

        <li>
          <Link to="/todoconfig">Todoconfig</Link>
        </li>
      </ul>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route exact path="/todo">
          {false ? <Todo /> : <Redirect to="/" />}
        </Route>
        <Route exact path="/todoconfig">
          <TodoConfig />
        </Route>
      </Switch>
    </Router>
  </Provider>
)

ReactDOM.render(<App />, document.querySelector('#app'))
