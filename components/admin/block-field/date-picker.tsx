// components/admin/atoms/Datepicker.tsx
'use client'

import Flatpickr from 'react-flatpickr'
import { Hook, Options } from 'flatpickr/dist/types/options'

interface DatepickerProps {
  label: string
  name: string
  value?: Date[]
  onChange?: (dates: Date[]) => void
  additional?: {
    align?: 'left' | 'right'
    required?: boolean
    flatpickrOptions?: Options
  }
}

const Datepicker = ({ label, name, value, onChange, additional }: DatepickerProps) => {
  const onReady: Hook = (selectedDates, dateStr, instance) => {
    ;(instance.element as HTMLInputElement).value = dateStr.replace('to', '-')
    //const customClass = additional?.flatpickrOptions?.align ?? ''
    const customClass = additional?.align ?? ''
    instance.calendarContainer.classList.add(`flatpickr-${customClass}`)
  }
  const moreOptions = additional?.flatpickrOptions || {}

  const defaultOptions: Options = {
    mode: moreOptions?.mode || 'single',
    static: true,
    monthSelectorType: 'static',
    //dateFormat: moreOptions?.dateFormat || 'M j, Y',
    dateFormat: moreOptions?.dateFormat || 'Y-m-d',
    //defaultDate: value || [new Date().setDate(new Date().getDate() - 6), new Date()],
    prevArrow:
      '<svg class="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M5.4 10.8l1.4-1.4-4-4 4-4L5.4 0 0 5.4z" /></svg>',
    nextArrow:
      '<svg class="fill-current" width="7" height="11"><path d="M1.4 10.8L0 9.4l4-4-4-4L1.4 0l5.4 5.4z" /></svg>',
    onReady,
    onChange: (selectedDates) => {
      if (onChange) onChange(selectedDates)
    },
  }

  const options = { ...defaultOptions, ...moreOptions }

  return (
    <div className="mt-2 w-full max-w-xl">
      <label className="mb-1 block text-sm font-medium" htmlFor={name}>
        {label}
        {additional?.required && <span className="text-rose-500">*</span>}
      </label>
      <div className="relative">
        <Flatpickr
          className="form-input w-[15.5rem] pl-9 font-medium text-slate-500 hover:text-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:text-slate-200"
          options={options}
        />
        <div className="pointer-events-none absolute inset-0 right-auto flex items-center">
          <svg
            className="ml-3 h-4 w-4 fill-current text-slate-500 dark:text-slate-400"
            viewBox="0 0 16 16"
          >
            <path d="M15 2h-2V0h-2v2H9V0H7v2H5V0H3v2H1a1 1 0 00-1 1v12a1 1 0 001 1h14a1 1 0 001-1V3a1 1 0 00-1-1zm-1 12H2V6h12v8z" />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default Datepicker
