import React, { ReactNode } from 'react'

type Props = {
  isLoading: boolean
  children: ReactNode
}

export const Loading = ({ children, isLoading }: Props) => {
  return isLoading ? (
    <div>
      <p>Loading</p>
    </div>
  ) : (
    <React.Fragment>{children}</React.Fragment>
  )
}
