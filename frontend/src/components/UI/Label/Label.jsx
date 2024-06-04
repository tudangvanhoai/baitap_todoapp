import { cn } from '@/utils/helper'

function Label(props) {
  const { name, className, children, isRequired } = props

  return (
    <label className={cn('font-medium', className)} htmlFor={name}>
      {children} {isRequired ? <span className="text-red-500">*</span> : ''}
    </label>
  )
}

export default Label
