import type { VehicleSelectorProps } from '../../types'
import { useTranslation } from 'react-i18next'
import VehicleSelector from './VehicleSelector/VehicleSelector'

export default function InsuranceSelector({ selected, setSelected }: VehicleSelectorProps) {
  const { t } = useTranslation()

  return (
    <div className="w-110 flex justify-center flex-col">
      <div className="flex flex-col gap-4 text-start">
        <div className="text-6xl text-indigo-600 font-light">
          {t('insuranceSelector.headline')}
        </div>
        <div className="text-2xl">
          {t('insuranceSelector.subtitle1')}
        </div>
        <div className="text-2xl">
          {t('insuranceSelector.subtitle2')}
        </div>
      </div>
      <div className="flex justify-evenly pt-8 text-indigo-600 mr-30">
        <VehicleSelector selected={selected} setSelected={setSelected} />
      </div>
    </div>
  )
}
