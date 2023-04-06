import * as React from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  fetchAsyncLogin,
  loadingComplete,
} from '../../../ts/stores/slices/loginSlice'
import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { Input } from '../components/Input'
import { Submit } from '../components/Submit'
import Cookies from 'js-cookie'

type FormInputs = {
  username: string
  password: string
  server: string
}
export const Login = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const {
    register,
    setError,
    formState: { errors },
    handleSubmit,
  } = useForm<FormInputs>()

  const onSubmit = async (data: any) => {
    const res: any = await dispatch(fetchAsyncLogin(data))
    if (res.payload.status === 200) {
      Cookies.set('token', res.payload.data.token)
      history.push('/todo')
    } else {
      console.log(res.payload.error)
      // TODO: setErrorのメッセージが消えるので、先にloading状態を解除
      dispatch(loadingComplete)
      setError('server', { type: 'server', message: `${res.payload.error}` })
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
