import * as React from 'react'

import { Input } from '../components/Input'
import { Submit } from '../components/Submit'

type FormInputs = {
  username: string
  password: string
  server: string
}
export const Login = () => {

  const onSubmit = async(data:any) => {
    const res = await fetch('http://localhost:3000/login', {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": 'application/json'
      }
    })
    const json = await res.json()

  }

  return(
    <form>
      <Submit />
    </form>
    
  )
}