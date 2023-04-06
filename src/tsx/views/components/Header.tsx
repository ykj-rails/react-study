import React from 'react'
import { css } from '@emotion/react'
import { useSelector } from 'react-redux'
import { selectIsLogin } from '../../../ts/stores/slices/loginSlice'
import { NavList } from './NavList'
import { Logout } from './Logout'

type headerBgColor = '#ccc' | 'yellow'

export const Header = () => {
  const isLogin = useSelector(selectIsLogin)
  const headerBgColor = isLogin ? '#ccc' : 'yellow'

  return (
    <header css={headerCss(headerBgColor)}>
      <h1>ヘッダーです</h1>
      <NavList />
      {isLogin && <Logout />}
    </header>
  )
}

const headerCss = (headerBgColor: headerBgColor) =>
  css`
    height: 60px;
    background: ${headerBgColor};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
  `
