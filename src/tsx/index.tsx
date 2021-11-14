import React, { useEffect, useLayoutEffect } from 'react'
import ReactDOM from 'react-dom'
import {
  Switch,
  Route,
  Redirect,
  BrowserRouter as Router,
} from 'react-router-dom'
import { Provider, useSelector, useDispatch } from 'react-redux'
import {
  fetchAsyncAuth,
  selectIsLogin,
  selectIsLoading,
} from '../ts/stores/slices/loginSlice'
import { store } from '../ts/stores'
import { Header } from './views/components/Header'
import { Loading } from './views/pages/Loading'
import { Login } from './views/pages/Login'
import { Todo } from './views/pages/Todo'
import { TodoConfig } from './views/pages/TodoConfig'
import Cookies from 'js-cookie'

const App = () => {
  const dispatch = useDispatch()
  const token = Cookies.get('token')
  const isLogin = useSelector(selectIsLogin)
  const isLoading = useSelector(selectIsLoading)

  const PrivateRoute = (props: any) => {
    if (isLogin) {
      return <Route {...props} />
    } else {
      return <Redirect to="/" />
    }
  }

  useEffect(() => {
    const fetchAuth = async (token: any) => {
      await dispatch(fetchAsyncAuth(token))
    }
    fetchAuth(token)
  }, [dispatch])

  {
    if (isLoading) {
      return <Loading />
    } else {
      return (
        <Router>
          <Header />
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/todoconfig" component={TodoConfig} />
            <PrivateRoute exact path="/todo" component={Todo} />
          </Switch>
        </Router>
      )
    }
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app'),
)
