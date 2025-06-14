import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export interface AddOn {
  id: string
  name: string
  description: string
  price: number
}

export interface StepThreeProps {
  selectedAddOns: string[]
  onBack: () => void
  onSubmit: (fields: { addOns: string[]; total: number }) => void
}

export default function StepThree({
  selectedAddOns: initial,
  onBack,
  onSubmit,
}: StepThreeProps) {
  const { t } = useTranslation()

  const addOns = t('addOns', { returnObjects: true }) as AddOn[]
  const [selected, setSelected] = useState<string[]>(initial)

  const toggle = (id: string) =>
    setSelected(ids =>
      ids.includes(id) ? ids.filter(x => x !== id) : [...ids, id]
    )

  const total = addOns
    .filter(a => selected.includes(a.id))
    .reduce((sum, a) => sum + a.price, 0)

  return (
    <div className="p-6 w-full max-w-lg space-y-6">
      <h2 className="text-lg font-medium">{t('stepThree.title')}</h2>
      <div className="text-sm text-gray-600">{t('stepThree.info')}</div>

      <div className="space-y-4">
        {addOns.map(addOn => {
          const isActive = selected.includes(addOn.id)
          return (
            <div
              key={addOn.id}
              onClick={() => toggle(addOn.id)}
              className={`cursor-pointer rounded-lg p-4 transition
                ${isActive
                  ? 'bg-green-50 border-green-500 text-gray-900'
                  : 'border border-green-500 text-gray-700'}`}
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">{addOn.name}</h3>
                <button
                  onClick={e => {
                    e.stopPropagation()
                    toggle(addOn.id)
                  }}
                  className={`px-3 py-1 rounded-lg border transition
                    ${isActive
                      ? 'bg-green-500 text-white border-green-500'
                      : 'text-green-500 border-green-500'}`}
                >
                  {isActive
                    ? t('stepThree.buttons.added')
                    : t('stepThree.buttons.add')}
                </button>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                {addOn.description}
              </p>
              <div className="border-t border-gray-200 pt-2 text-sm font-semibold">
                ₸{addOn.price.toFixed(2)}
              </div>
            </div>
          )
        })}
      </div>

      <div className="flex justify-between items-center pt-4">
        <div className="text-sm font-medium">
          {t('stepThree.total')}: ₸{total.toFixed(2)}
        </div>
        <div className="space-x-2">
          <button
            type="button"
            onClick={onBack}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
          >
            {t('stepThree.buttons.back')}
          </button>
          <button
            type="button"
            onClick={() => onSubmit({ addOns: selected, total })}
            disabled={selected.length === 0}
            className={`px-4 py-2 rounded-lg text-white font-medium transition-colors
              ${selected.length > 0
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-gray-300 cursor-not-allowed'}`}
          >
            {t('stepThree.buttons.next')}
          </button>
        </div>
      </div>
    </div>
  )
}
