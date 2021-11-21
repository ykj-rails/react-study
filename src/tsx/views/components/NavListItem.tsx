import { Link } from 'react-router-dom'
import { css } from '@emotion/react'

type Props = {
  link: string
  linkText: string
}

export const NavListItem = ({ link, linkText }: Props) => {
  // TODO: Fragmentつかいてぇぇぇ
  return (
    <div>
      <li css={navLi}>
        <Link to={link}>{linkText}</Link>
      </li>
    </div>
  )
}

const navLi = css`
  font-size: 18px;
  font-weight: 700;
  margin-left: 20px;
  list-style: none;
  text-decoration: none;
`
