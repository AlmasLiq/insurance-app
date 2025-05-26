import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { Plan } from '../../../types'

export interface StepTwoProps {
  onBack: () => void
  onSubmit: (data: { planId: string; tenure: number; idv: number }) => void
}

export default function StepTwo({ onBack, onSubmit }: StepTwoProps) {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()
  const tenures = [1, 2, 3]

  const plans = t('plans', { returnObjects: true }) as Plan[]

  const [selectedTenure, setSelectedTenure] = useState(3)
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null)
  const [modalPlan, setModalPlan] = useState<Plan | null>(null)

  const selectedPlan = plans.find(p => p.id === selectedPlanId) ?? null
  const idv = selectedPlan ? selectedPlan.pricePerYear * selectedTenure : 0
  const canContinue = !!selectedPlan

  return (
    <>
      <div className="p-6 w-full max-w-lg space-y-6">
        <h2 className="text-lg font-medium">{t('stepTwo.title')}</h2>

        <div className="bg-gray-100 rounded-md p-4 flex justify-between items-center">
          <span>{t('stepTwo.yearLabel', { year: currentYear })}</span>
        </div>

        <div>
          <div className="mb-2 text-sm font-medium">
            {t('stepTwo.tenureLabel')}
          </div>
          <div className="flex gap-2">
            {tenures.map(n => (
              <button
                key={n}
                onClick={() => setSelectedTenure(n)}
                className={`flex-1 text-center py-2 border rounded-lg transition
                  ${selectedTenure === n
                    ? 'bg-green-500 text-white border-green-500'
                    : 'text-green-500 border-green-500'}`}
              >
                {t('stepTwo.tenures', { count: n })}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {plans.map(plan => {
            const isActive = plan.id === selectedPlanId
            return (
              <div
                key={plan.id}
                onClick={() => setSelectedPlanId(plan.id)}
                className={`cursor-pointer rounded-lg p-4 transition
                  ${isActive
                    ? 'bg-green-500 text-white'
                    : 'border border-green-500 text-green-500'}`}
              >
                <h3 className="font-medium mb-2">{plan.name}</h3>
                <ul className="space-y-1 mb-2">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-center text-sm">
                      <span className="mr-2">
                        {f.covered ? '✔️' : '❌'}
                      </span>
                      {f.description}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={e => {
                    e.stopPropagation()
                    setModalPlan(plan)
                  }}
                  className={`underline text-sm ${
                    isActive ? 'text-white' : 'text-blue-600'
                  }`}
                >
                  {t('stepTwo.buttons.more')}
                </button>
              </div>
            )
          })}
        </div>

        <div className="bg-gray-50 p-4 rounded-md flex justify-between text-sm">
          <span>{t('stepTwo.idvLabel')}</span>
          <span>₸{idv.toFixed(2)}</span>
        </div>

        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={onBack}
            className="px-4 py-2 rounded-lg text-white font-medium bg-gray-600 hover:bg-gray-700 transition-colors"
          >
            {t('stepTwo.buttons.back')}
          </button>
          <button
            onClick={() =>
              selectedPlan &&
              onSubmit({ planId: selectedPlan.id, tenure: selectedTenure, idv })
            }
            disabled={!canContinue}
            className={`px-4 py-2 rounded-lg text-white font-medium transition-colors
              ${
                canContinue
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
          >
            {t('stepTwo.buttons.next')}
          </button>
        </div>
      </div>

      {modalPlan && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">{modalPlan.name}</h3>
              <button
                onClick={() => setModalPlan(null)}
                className="text-gray-500"
              >
                {t('stepTwo.buttons.close')}
              </button>
            </div>

            <p className="text-sm mb-2">
              {modalPlan.benefits.covered.map(b => b.title).join(', ')}.
            </p>

            <div>
              <h4 className="font-semibold">{t('stepTwo.modal.coveredTitle')}</h4>
              <ul className="list-disc pl-5 space-y-1">
                {modalPlan.benefits.covered.map((b, i) => (
                  <li key={i}>
                    <span className="font-medium">{b.title}:</span> {b.description}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold">{t('stepTwo.modal.notCoveredTitle')}</h4>
              <ul className="list-disc pl-5 space-y-1">
                {modalPlan.benefits.notCovered.map((b, i) => (
                  <li key={i}>
                    <span className="font-medium">{b.title}:</span> {b.description}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setModalPlan(null)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
              >
                {t('stepTwo.buttons.close')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
