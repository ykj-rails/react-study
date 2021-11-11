import { css } from '@emotion/react'
import { useSelector } from 'react-redux'
import { selectIsLogin } from '../../../ts/stores/slices/loginSlice'

export const Header = () => {
  const isLogin = useSelector(selectIsLogin)
  return <header css={headerCss(isLogin)}>ヘッダーです</header>
}
const headerCss() = css`
  background: #ccc;
`
