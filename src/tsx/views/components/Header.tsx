import React from 'react'
import { css } from '@emotion/react'
import { useSelector } from 'react-redux'
import { selectIsLogin } from '../../../ts/stores/slices/loginSlice'
import { Nav } from './Nav'

export const Header = () => {
  const isLogin = useSelector(selectIsLogin)
  const headerBgColor = isLogin ? '#ccc' : 'yellow'
  // TODO: フラグメントにしたらエラーになった
  return (
    <header css={headerCss(headerBgColor)}>
      <h1>ヘッダーです</h1>
      <Nav />
    </header>
  )
}

const headerCss = (headerBgColor: any) =>
  css`
    height: 60px;
    background: ${headerBgColor};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
  `
