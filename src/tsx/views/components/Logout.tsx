import React from 'react'
import Cookies from 'js-cookie'

export const Logout = () => {
  const onLogout = () => {
    Cookies.remove('token')
    window.location.href = '/'
  }

  return (
    <div>
      <button onClick={onLogout}>ログアウト</button>
    </div>
  )
}
