import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { Input } from '../components/Input'
import { Submit } from '../components/Submit'

type FormInputs = {
  username: string
  password: string
  server: string
}
export const Login = () => {
  const dispatch = useDispatch()
  const {
    register,
    setError,
    formState: { errors },
    handleSubmit,
  } = useForm<FormInputs>()

  const onSubmit = async (data: any) => {
    await dispatch()
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
