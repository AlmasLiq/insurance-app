// src/components/InsuranceForm/StepOne/StepOne.tsx
import { ChevronDownIcon, CalendarDaysIcon } from '@heroicons/react/24/outline'
import type { SharedDataContext, StepOneProps } from '../../../types'
import { useOutletContext } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

// генерируем список годов от 1980 до текущего
const currentYear = new Date().getFullYear()
const yearOptions = Array.from(
  { length: currentYear - 1980 + 1 },
  (_, i) => (1980 + i).toString()
).reverse()

export default function StepOne({
  makeModel,
  regDate,
  policyStatus,
  manufactureYear,
  onChange,
  onNext,
}: StepOneProps) {
  const { t } = useTranslation()
  const isValid =
    !!makeModel && !!regDate && !!policyStatus && !!manufactureYear

  const { cars, motos } = useOutletContext<SharedDataContext>()
  const transportList =
    sessionStorage.getItem('vehicleType') === 'car'
      ? cars
      : motos

  return (
    <>
      <h2 className="text-lg font-medium mb-6">
        {t('stepOne.title')}
      </h2>

      {/* Производитель & Модель */}
      <label className="block mb-4">
        <span className="text-sm font-semibold text-gray-700">
          {t('stepOne.fields.makeModel')}
        </span>
        <div className="relative mt-1">
          <select
            value={makeModel}
            onChange={e => onChange({ makeModel: e.target.value })}
            className="w-full appearance-none border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          >
            <option value="">{t('stepOne.placeholders.select')}</option>
            {transportList.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <ChevronDownIcon className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </label>

      {/* Год выпуска */}
      <label className="block mb-4">
        <span className="text-sm font-semibold text-gray-700">
          {t('stepOne.fields.manufactureYear')}
        </span>
        <div className="relative mt-1">
          <select
            value={manufactureYear || ''}
            onChange={e => onChange({ manufactureYear: e.target.value })}
            className="w-full appearance-none border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          >
            <option value="">{t('stepOne.placeholders.year')}</option>
            {yearOptions.map(year => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <ChevronDownIcon className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </label>

      {/* Дата Регистрации */}
      <label className="block mb-4">
        <span className="text-sm font-semibold text-gray-700">
          {t('stepOne.fields.regDate')}
        </span>
        <div className="relative mt-1">
          <input
            type="date"
            value={regDate}
            onChange={e => onChange({ regDate: e.target.value })}
            className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />
          <CalendarDaysIcon className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </label>

      {/* Статус полиса */}
      <label className="block mb-6">
        <span className="text-sm font-semibold text-gray-700">
          {t('stepOne.fields.policyStatus')}
        </span>
        <div className="relative mt-1">
          <select
            value={policyStatus}
            onChange={e => onChange({ policyStatus: e.target.value })}
            className="w-full appearance-none border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          >
            <option value="">{t('stepOne.placeholders.select')}</option>
            <option value="not-expired">{t('stepOne.statusOptions.notExpired')}</option>
            <option value="expired-90">{t('stepOne.statusOptions.expired90')}</option>
            <option value="expired-90-plus">{t('stepOne.statusOptions.expired90Plus')}</option>
          </select>
          <ChevronDownIcon className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </label>

      <button
        type="button"
        onClick={onNext}
        disabled={!isValid}
        className={`w-full py-2 rounded-lg text-white font-medium transition-colors ${
          isValid
            ? 'bg-green-600 hover:bg-green-700'
            : 'bg-gray-300 cursor-not-allowed'
        }`}
      >
        {t('stepOne.buttons.next')}
      </button>
    </>
  )
}
