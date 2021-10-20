import * as React from 'react'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import Cookies from 'js-cookie'

import { Input } from '../components/Input'
import { Submit } from '../components/Submit'

type FormInputs = {
  username: string
  password: string
  server: string
}
export const Login = () => {
  const {
    register,
    setError,
    formState: { errors },
    handleSubmit,
  } = useForm<FormInputs>()

  let history = useHistory()

  const onSubmit = async (data: any) => {
    const res = await fetch('http://localhost:3000/login', {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const json = await res.json()
    if (json.status === 200) {
      Cookies.set('token', json.data.token)
      history.push('/todo')
    } else {
      setError('server', { type: 'server', message: `${json.error}` })
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        regist={register('username', { required: 'usernameは必須です' })}
      />
      <ErrorMessage errors={errors} name="username" />
      <Input
        regist={register('password', {
          required: 'passwordは必須です',
          minLength: {
            value: 5,
            message: 'passwordは5文字以上で入力してください',
          },
        })}
      />
      <ErrorMessage errors={errors} name="password" />
      <ErrorMessage errors={errors} name="server" />
      <Submit />
    </form>
  )
}
