import * as React from 'react'

export const Input: React.FC<{ regist: any }> = ({ regist }) => {
  return (
    <label>
      <input {...regist} />
    </label>
  )
}
