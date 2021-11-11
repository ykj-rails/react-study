import { css } from '@emotion/react'
import { useSelector } from 'react-redux'
import { selectIsLogin } from '../../../ts/stores/slices/loginSlice'

export const Header = () => {
  const isLogin = useSelector(selectIsLogin)
  const headerBgColor = isLogin ? '#ccc' : 'yellow'
  return <header css={headerCss(headerBgColor)}>ヘッダーです</header>
}

const headerCss = (headerBgColor: any) =>
  css`
    background: ${headerBgColor};
  `
