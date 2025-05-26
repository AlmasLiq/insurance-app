// src/components/InsuranceForm/StepOne/StepOne.tsx
import { ChevronDownIcon, CalendarDaysIcon } from '@heroicons/react/24/outline'
import type { SharedDataContext, StepOneProps } from '../../../types'
import { useOutletContext } from 'react-router-dom'

// генерируем список годов от 1980 до текущего
const currentYear = new Date().getFullYear()
const yearOptions = Array.from(
  { length: currentYear - 1980 + 1 },
  (_, i) => (1980 + i).toString()
).reverse() // последние года первыми

export default function StepOne({
  makeModel,
  regDate,
  policyStatus,
  manufactureYear,
  onChange,
  onNext,
}: StepOneProps) {
  const isValid =
    !!makeModel && !!regDate && !!policyStatus && !!manufactureYear

  const { cars, motos } = useOutletContext<SharedDataContext>();
  
  const transportList =
    sessionStorage.getItem('vehicleType') === 'car'
      ? cars
      : motos

  return (
    <>
      <h2 className="text-lg font-medium mb-6">
        Заполните данные про ваш транспорт
      </h2>

      {/* Производитель & Модель */}
      <label className="block mb-4">
        <span className="text-sm font-semibold text-gray-700">
          Производитель &amp; Модель
        </span>
        <div className="relative mt-1">
          <select
            value={makeModel}
            onChange={e => onChange({ makeModel: e.target.value })}
            className="w-full appearance-none border border-gray-300 rounded-lg py-2 px-3
                       focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-transparent"
          >
            <option value="">– выберите –</option>
            {transportList.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <ChevronDownIcon className="w-5 h-5 text-gray-400 pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" />
        </div>
      </label>

      {/* Год выпуска */}
      <label className="block mb-4">
        <span className="text-sm font-semibold text-gray-700">
          Год выпуска
        </span>
        <div className="relative mt-1">
          <select
            value={manufactureYear || ''}
            onChange={e =>
              onChange({ manufactureYear: e.target.value })
            }
            className="w-full appearance-none border border-gray-300 rounded-lg py-2 px-3
                       focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-transparent"
          >
            <option value="">– выберите год –</option>
            {yearOptions.map(year => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <ChevronDownIcon className="w-5 h-5 text-gray-400 pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" />
        </div>
      </label>

      {/* Дата Регистрации */}
      <label className="block mb-4">
        <span className="text-sm font-semibold text-gray-700">
          Дата Регистрации
        </span>
        <div className="relative mt-1">
          <input
            type="date"
            value={regDate}
            onChange={e => onChange({ regDate: e.target.value })}
            className="w-full border border-gray-300 rounded-lg py-2 px-3
                       focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-transparent"
          />
          <CalendarDaysIcon className="w-5 h-5 text-gray-400 pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" />
        </div>
      </label>

      {/* Статус полиса */}
      <label className="block mb-6">
        <span className="text-sm font-semibold text-gray-700">
          Статус полиса
        </span>
        <div className="relative mt-1">
          <select
            value={policyStatus}
            onChange={e =>
              onChange({ policyStatus: e.target.value })
            }
            className="w-full appearance-none border border-gray-300 rounded-lg py-2 px-3
                       focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-transparent"
          >
            <option value="">– выберите –</option>
            <option value="not-expired">Не просрочен</option>
            <option value="expired-90">
              Истёк за последние 90 дней
            </option>
            <option value="expired-90-plus">
              Истёк более 90 дней
            </option>
          </select>
          <ChevronDownIcon className="w-5 h-5 text-gray-400 pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" />
        </div>
      </label>

      <button
        type="button"
        onClick={onNext}
        disabled={!isValid}
        className={`
          w-full py-2 rounded-lg text-white font-medium transition-colors
          ${isValid
            ? 'bg-green-600 hover:bg-green-700'
            : 'bg-gray-300 cursor-not-allowed'}
        `}
      >
        Далее
      </button>
    </>
  )
}
