import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'

import { store } from '../ts/stores'
import { Login } from './views/pages/Login'
import { Todo } from './views/pages/Todo'
import { TodoConfig } from './views/pages/TodoConfig'
import { Header } from './views/components/Header'

const App = () => (
  <Provider store={store}>
    <div>
      <Header />
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
    </div>
  </Provider>

)

ReactDOM.render(<App/>, document.querySelector('#app'))