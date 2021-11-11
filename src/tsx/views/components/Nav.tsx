import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectIsLogin } from '../../../ts/stores/slices/loginSlice'
import { Logout } from './Logout'
import { css } from '@emotion/react'

export const Nav = () => {
  const isLogin = useSelector(selectIsLogin)
  return (
    <nav>
      <ul css={navUl}>
        {isLogin && (
          <li css={navLi}>
            <Link to="/todo">Todo</Link>
          </li>
        )}
        <li css={navLi}>
          <Link to="/todoconfig">Todoconfig</Link>
        </li>
        <li css={navLi}>{isLogin ? <Logout /> : <Link to="/">Login</Link>}</li>
      </ul>
    </nav>
  )
}

const navUl = css`
  display: flex;
`

const navLi = css`
  font-size: 18px;
  font-weight: 700;
  margin-left: 20px;
  list-style: none;
  text-decoration: none;
`
