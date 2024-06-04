import { cn } from '@/utils/helper'

const Button = props => {
  const { children, type = 'button', className, ...rest } = props

  return (
    <button
      type={type}
      className={cn(
        'flex items-center justify-center gap-2 whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-white shadow-sm hover:bg-indigo-700',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
