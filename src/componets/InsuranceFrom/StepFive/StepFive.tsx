// src/components/InsuranceForm/StepFive/StepFive.tsx
import type { PolicyDetails } from '../../../types'
import { addYearToDate } from '../../../utils/addYearToDate'
import getTodayData from '../../../utils/getTodayData'
import { useTranslation } from 'react-i18next'

export type StepFiveProps = PolicyDetails

export default function StepFive({
  insurer,
  policyNumber,
  iin,
  status,
  makeModel,
  fullName,
  tenure,
  manufactureYear,
}: StepFiveProps) {
  const { t } = useTranslation()
  const todayDate = getTodayData()
  const regNumber = sessionStorage.getItem('registrationNumber') ?? ''
  const vehicleKey = sessionStorage.getItem('vehicleType') === 'car' ? 'car' : 'moto'
  const vehicleLabel = t(`insurance.${vehicleKey}`)

  return (
    <div className="p-6 w-full max-w-2xl mx-auto space-y-6">
      {/* Заголовок */}
      <h2 className="text-base font-semibold text-gray-700">
        {t('stepFive.title')}
      </h2>

      {/* Общие данные */}
      <div className="space-y-4">
        <DataRow label={t('stepFive.company')} value={insurer} />
        <DataRow label={t('stepFive.policyNumber')} value={policyNumber} />
        <DataRow label={t('stepFive.fullName')} value={fullName} />
        <DataRow label={t('stepFive.iin')} value={iin} />
        <DataRow label={t('stepFive.issueDate')} value={todayDate} />
        <DataRow label={t('stepFive.startDate')} value={todayDate} />
        <DataRow
          label={t('stepFive.endDate')}
          value={addYearToDate(todayDate, tenure as number)}
        />
        <DataRow label={t('stepFive.status')} value={status} />
      </div>

      <hr className="border-gray-200" />

      {/* Данные по транспортному средству */}
      <h3 className="text-base font-semibold text-gray-700">
        {t('stepFive.vehicleSection')}
      </h3>
      <div className="border border-gray-200 rounded-lg p-4 flex items-center space-x-6">
        {/* Иконка автомобиля */}
        <svg
          className="w-10 h-6 text-green-600"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M3 9l1-3h12l1 3v6a1 1 0 01-1 1h-1a1 1 0 01-2 0H6a1 1 0 01-2 0H3a1 1 0 01-1-1V9z" />
        </svg>
        {/* Сетка с данными */}
        <div className="flex-1 grid grid-cols-3 gap-x-4">
          <div className="text-sm text-gray-500">{t('stepFive.grid.regNumber')}</div>
          <div className="text-sm text-gray-500">{t('stepFive.grid.year')}</div>
          <div />
          <div className="text-lg font-medium">{regNumber}</div>
          <div className="text-lg font-medium">{manufactureYear}</div>
          <div />
          <div className="text-sm text-gray-500">{t('stepFive.grid.transport')}</div>
          <div className="text-sm text-gray-500">{t('stepFive.grid.model')}</div>
          <div />
          <div className="text-lg font-medium">{vehicleLabel}</div>
          <div className="text-lg font-medium">{makeModel}</div>
          <div />
        </div>
      </div>

      {/* Источник */}
      <div className="text-xs text-gray-500">
        {t('stepFive.source')}
      </div>
    </div>
  )
}

function DataRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-3 gap-x-4">
      <div className="text-sm text-gray-500">{label}</div>
      <div className="col-span-2 text-sm font-medium">{value}</div>
    </div>
  )
}
