import { FC } from 'react'
import NextHead from 'next/head'

export const Head = () => {
  return (
    <NextHead>
      <title>OpenFaaS function</title>
      {process.env.NEXT_PUBLIC_PAYMENT_POINTER ? (
        <meta name='monetization' content={process.env.NEXT_PUBLIC_PAYMENT_POINTER} />
      ) : (
        <></>
      )}
    </NextHead>
  )
}
