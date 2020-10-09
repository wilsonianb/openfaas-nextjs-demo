import { useEffect, useState } from 'react'
import { useMonetizationCounter } from 'react-web-monetization'

export const WebMonetizationStatus = () => {
  const { receipt } = useMonetizationCounter()
  const [status, setStatus] = useState(
    <div>
      <p>Pay with <a href='https://webmonetization.org'>web monetization</a></p>
    </div>
  )
  const [totalReceived, setTotalReceived] = useState(0)

  useEffect(() => {
    if (receipt) {
      const submitReceipt = async () => {
        const res = await fetch(process.env.NEXT_PUBLIC_RECEIPT_VERIFIER_URI, {
          method: 'POST',
          body: receipt
        })
        if (res.ok) {
          const value = parseInt(await res.text())
          const total = value + totalReceived
          setTotalReceived(value)
          setStatus(
            <div>
              <p>total received: {totalReceived}</p>
              <p>+{value}</p>
            </div>
          )
        }
      }
      void submitReceipt()
    }
  }, [receipt])

  return status
}
