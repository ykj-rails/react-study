import React, { useEffect } from 'react'
import * as ReactDOM from 'react-dom'
import {
  Switch,
  Route,
  Link,
  Redirect,
  BrowserRouter as Router,
} from 'react-router-dom'
import { Provider, useSelector, useDispatch } from 'react-redux'
import Cookies from 'js-cookie'
import { selectIsLogin, loginCheck } from '../ts/stores/slices/loginSlice'
import { store } from '../ts/stores'
import { Login } from './views/pages/Login'
import { Todo } from './views/pages/Todo'
import { TodoConfig } from './views/pages/TodoConfig'
import { Header } from './views/components/Header'

const App = () => {
  const dispatch = useDispatch()
  const token = Cookies.get('token')
  const isLogin = useSelector(selectIsLogin)

  useEffect(() => {
    dispatch(loginCheck(token))
  }, [dispatch])

  return (
    <Router>
      <Header />
      <ul>
        <li>
          <Link to="/">Login</Link>
        </li>
        {isLogin && (
          <li>
            <Link to="/todo">Todo</Link>
          </li>
        )}

        <li>
          <Link to="/todoconfig">Todoconfig</Link>
        </li>
      </ul>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/todoconfig" component={TodoConfig} />
        <Route exact path="/todo">
          {isLogin ? <Todo /> : <Redirect to="/" />}
        </Route>
      </Switch>
    </Router>
  )
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app'),
)

// done.
// Login直後は /todo にリダイレクトする。

// logoutコンポーネント作成
// リンクリストコンポーネント化する
// Loginが切れたらトップにリダイレクトする。
// /todoはログイン状態（つまりtokenが保持されている状態)のみアクセス可能とする。
// tokenはreduxではなくCookieにて管理する。（再訪問時もログインが生きるようにするため）
// 別APIを叩くなどで認証が必要になったときに初めて期限切れtokenを破棄する。
