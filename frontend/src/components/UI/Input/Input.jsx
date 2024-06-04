import { forwardRef } from 'react'
import { Controller } from 'react-hook-form'
import { Label } from '@/components/UI'
import { cn } from '@/utils/helper'

const BaseInput = forwardRef(({ type, name, className, error, ...rest }, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      id={name}
      name={name}
      className={cn(
        'w-full rounded-lg border border-gray-500 bg-transparent p-2.5 focus:ring focus:ring-gray-300',
        error && 'border-red-500 focus:ring-red-200',
        rest.disabled && 'bg-gray-300',
        className,
      )}
      {...rest}
    />
  )
})

const Input = props => {
  const {
    ref,
    type = 'text',
    classNameLayout = '',
    label,
    classNameLabel = '',
    className = '',
    name,
    control,
    error,
    isRequired = false,
    ...rest
  } = props

  return (
    <div className={cn(classNameLayout)}>
      <Label name={name} className={cn(classNameLabel)} isRequired={isRequired}>
        {label}
      </Label>
      {control ? (
        <Controller
          control={control}
          name={name || ''}
          render={({ field }) => (
            <BaseInput
              {...field}
              type={type}
              name={name}
              className={className}
              error={error}
              value={field.value ?? ''}
              {...rest}
            />
          )}
        />
      ) : (
        <BaseInput ref={ref} type={type} name={name} className={className} {...rest} />
      )}
      {error && <p className="text-xs italic text-red-500">{error.message}</p>}
    </div>
  )
}

export default Input
