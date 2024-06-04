import { cn } from '@/utils/helper'
import { forwardRef } from 'react'
import { Controller } from 'react-hook-form'
import { Label } from '@/components/UI'

const BaseSelect = forwardRef(
  ({ name, className, error, zeroValueText, options, ...rest }, ref) => {
    return (
      <select
        ref={ref}
        id={name}
        name={name}
        className={cn(
          'w-full rounded-lg border border-gray-500 bg-transparent p-2.5 focus:ring focus:ring-gray-300',
          error && 'border-red-500 focus:ring-red-200',
          rest.disabled && 'bg-gray-300',
          className,
        )}
        {...rest}
      >
        {zeroValueText && <option value="">{zeroValueText}</option>}
        {options?.map(option => {
          const { id, name, value } = option
          return (
            <option key={id} value={value ?? id}>
              {name}
            </option>
          )
        })}
      </select>
    )
  },
)

const Select = props => {
  const {
    ref,
    classNameLayout = '',
    label,
    classNameLabel = '',
    className = '',
    name,
    options,
    control,
    zeroValueText = '',
    error,
    isRequired = false,
    ...rest
  } = props

  return (
    <div className={classNameLayout}>
      <Label name={name} className={classNameLabel} isRequired={isRequired}>
        {label}
      </Label>
      {control ? (
        <Controller
          control={control}
          name={name || ''}
          render={({ field }) => (
            <BaseSelect
              {...field}
              name={name}
              className={className}
              error={error}
              zeroValueText={zeroValueText}
              options={options}
              {...rest}
            />
          )}
        />
      ) : (
        <BaseSelect
          ref={ref}
          name={name}
          className={className}
          error={error}
          zeroValueText={zeroValueText}
          options={options}
          {...rest}
        />
      )}
      {error && <p className="text-xs italic text-red-500">{error.message ?? ''}</p>}
    </div>
  )
}

export default Select
