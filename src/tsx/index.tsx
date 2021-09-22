import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from './stores'
import { Login } from './views/pages/Login'
import { Todo } from './views/pages/Todo'
import { TodoConfig } from './views/pages/TodoConfig'

const App = () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/todo">
          <Todo />
        </Route>
        <Route path="todoconfig">
          <TodoConfig />
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </Router>
  </Provider>

)

ReactDOM.render(<App/>, document.querySelector('#app'))