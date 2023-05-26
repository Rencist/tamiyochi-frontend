import * as React from 'react';
import { get, RegisterOptions, useFormContext } from 'react-hook-form';
import { IconType } from 'react-icons';
import { HiEye, HiEyeOff } from 'react-icons/hi';

import ErrorMessage from '@/components/form/ErrorMessage';
import HelperText from '@/components/form/HelperText';
import Typography from '@/components/typography/Typography';
import clsxm from '@/lib/clsxm';

export type InputProps = {
  id: string;
  label?: string;
  helperText?: string;
  hideError?: boolean;
  validation?: RegisterOptions;
  prefix?: string;
  suffix?: string;
  leftIcon?: IconType;
  rightIcon?: IconType;
  leftIconClassName?: string;
  rightIconClassName?: string;
} & React.ComponentPropsWithoutRef<'input'>;

export default function Input({
  id,
  label,
  helperText,
  hideError = false,
  validation,
  className,
  type = 'text',
  readOnly = false,
  prefix,
  suffix,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  leftIconClassName,
  rightIconClassName,
  ...rest
}: InputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const [showPassword, setShowPassword] = React.useState(false);
  const error = get(errors, id);

  return (
    <div className='w-full space-y-1.5'>
      {label && (
        <label htmlFor={id} className='flex space-x-1'>
          <Typography className='font-semibold text-teal-600'>
            {label}
          </Typography>
          {validation?.required && (
            <Typography className='text-red-200'>*</Typography>
          )}
        </label>
      )}

      <div className='w-full flex items-stretch'>
        {prefix && (
          <Typography className='p-3 bg-yellow-200 text-teal-600 text-opacity-50 rounded-l-md'>
            {prefix}
          </Typography>
        )}

        <div className='relative w-full'>
          {LeftIcon && (
            <div
              className={clsxm(
                'absolute top-0 left-0 h-full',
                'flex justify-center items-center pl-3',
                'text-base-icon text-lg md:text-xl',
                leftIconClassName
              )}
            >
              <LeftIcon />
            </div>
          )}

          <input
            {...register(id, validation)}
            type={
              type === 'password' ? (showPassword ? 'text' : 'password') : type
            }
            id={id}
            name={id}
            readOnly={readOnly}
            disabled={readOnly}
            className={clsxm(
              'w-full h-full px-3 py-2.5 rounded-md',
              [LeftIcon && 'pl-9', RightIcon && 'pr-9'],
              [prefix && 'rounded-l-none', suffix && 'rounded-r-none'],
              'border-none focus:ring-1 focus:ring-inset',
              'bg-yellow-50 font-secondary text-teal-600',
              'placeholder:font-secondary placeholder:text-teal-600 placeholder:text-opacity-25',
              readOnly && 'cursor-not-allowed',
              error
                ? 'focus:ring-red-200 ring-1 ring-inset ring-red-200'
                : 'focus:ring-teal-600',
              className
            )}
            aria-describedby={id}
            {...rest}
          />

          {RightIcon && type !== 'password' && (
            <div
              className={clsxm(
                'absolute bottom-0 right-0 h-full',
                'flex justify-center items-center pr-3',
                'text-teal-600 text-opacity-50 text-lg md:text-xl',
                rightIconClassName
              )}
            >
              <RightIcon />
            </div>
          )}

          {type === 'password' && (
            <div
              className={clsxm(
                'absolute bottom-0 right-0 h-full',
                'flex justify-center items-center pr-3',
                'text-base-icon text-lg md:text-xl',
                rightIconClassName
              )}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <HiEyeOff /> : <HiEye />}
            </div>
          )}
        </div>

        {suffix && (
          <Typography className='p-3 bg-yellow-200 text-teal-600 text-opacity-50 rounded-r-md'>
            {suffix}
          </Typography>
        )}
      </div>

      {!hideError && error && <ErrorMessage>{error.message}</ErrorMessage>}
      {helperText && <HelperText>{helperText}</HelperText>}
    </div>
  );
}
