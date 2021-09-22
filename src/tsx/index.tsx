import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'

import { Login } from './views/pages/Login'
import { Todo } from './views/pages/Todo'
import { TodoConfig } from './views/pages/TodoConfig'

const App = () => (
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

)

ReactDOM.render(<App/>, document.querySelector('#app'))