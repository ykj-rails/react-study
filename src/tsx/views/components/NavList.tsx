import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectIsLogin } from '../../../ts/stores/slices/loginSlice'
import { Logout } from './Logout'
import { NavListItem } from './NavListItem'
import { css } from '@emotion/react'

export const NavList = () => {
  const isLogin = useSelector(selectIsLogin)
  return (
    <nav>
      <ul css={navUl}>
        {isLogin && <NavListItem link="/todo" linkText="Todo" />}
        <NavListItem link="/todoconfig" linkText="Todoconfig" />
        {!isLogin && <NavListItem link="/" linkText="Login" />}
      </ul>
    </nav>
  )
}

const navUl = css`
  display: flex;
`
