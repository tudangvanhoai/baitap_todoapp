import { useMemo, useState } from 'react'
import { LoadingContext } from '@/contexts/loadingContext'
import { LoadingOverlay } from '@/components/UI'
import { DEBOUNCE } from '@/config/define'

const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false)

  const valueLoading = useMemo(
    () => ({
      loading,
      showLoading: () => setLoading(true),
      hideLoading: () => {
        setTimeout(() => setLoading(false), DEBOUNCE.TIME_OUT)
      },
    }),
    [loading],
  )

  return (
    <LoadingContext.Provider value={valueLoading}>
      <>
        {loading && <LoadingOverlay open />}
        {children}
      </>
    </LoadingContext.Provider>
  )
}

export default LoadingProvider
