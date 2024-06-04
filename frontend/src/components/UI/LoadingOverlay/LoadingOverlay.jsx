import { cn } from '@/utils/helper'

const LoadingOverlay = ({ open }) => {
  return (
    <div
      className={cn(
        open ? 'z-[10000] opacity-75' : '-z-50 opacity-0',
        'fixed bottom-0 left-0 right-0 top-0 flex h-screen w-screen flex-col items-center justify-center overflow-hidden bg-gray-700 transition-opacity ease-in-out',
      )}
    >
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-t-4 border-gray-200 border-t-transparent ease-linear"></div>
    </div>
  )
}

export default LoadingOverlay
