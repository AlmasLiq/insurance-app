// src/components/InsuranceForm/StepTwo/StepTwo.tsx
import { useState } from 'react'
import type { Plan } from '../../../types';
import plans from '../../../mockData/mockPlan';

export interface StepTwoProps {
  onBack: () => void
  onSubmit: (data: { planId: string; tenure: number; idv: number }) => void
}

export default function StepTwo({ onBack, onSubmit }: StepTwoProps) {
  const currentYear = new Date().getFullYear()
  const tenures = [1, 2, 3]

  const [selectedTenure, setSelectedTenure] = useState(3)
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null)
  const [modalPlan, setModalPlan] = useState<Plan | null>(null)

  const selectedPlan = plans.find(p => p.id === selectedPlanId) ?? null
  const idv = selectedPlan ? selectedPlan.pricePerYear * selectedTenure : 0

  const canContinue = !!selectedPlan

  return (
    <>
      {/* План выбора */}
      <div className="p-6 w-full max-w-lg space-y-6">
        <h2 className="text-lg font-medium">Выбор плана</h2>

        {/* Год и редактировать */}
        <div className="bg-gray-100 rounded-md p-4 flex justify-between items-center">
          <span>Год: {currentYear}</span>
        </div>

        {/* Срок полиса */}
        <div>
          <div className="mb-2 text-sm font-medium">Выберите срок действия</div>
          <div className="flex gap-2">
            {tenures.map(t => (
              <button
                key={t}
                onClick={() => setSelectedTenure(t)}
                className={`flex-1 text-center py-2 border rounded-lg transition 
                  ${selectedTenure === t
                    ? 'bg-green-500 text-white border-green-500'
                    : 'text-green-500 border-green-500'}`}
              >
                {t} {t === 1 ? 'год' : 'года'}
              </button>
            ))}
          </div>
        </div>

        {/* Карточки планов */}
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
                        {f.covered
                          ? isActive ? '✔️' : '✔️'
                          : '❌'}
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
                  Подробнее о покрытии
                </button>
              </div>
            )
          })}
        </div>

        {/* IDV */}
        <div className="bg-gray-50 p-4 rounded-md flex justify-between text-sm">
          <span>IDV (Страховая сумма)</span>
          <span>₸{idv.toFixed(2)}</span>
        </div>

        {/* Налоги и продолжить */}
        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={onBack}
            className="px-4 py-2 rounded-lg text-white font-medium bg-gray-600 hover:bg-gray-700 transition-colors"
>
            Назад
          </button>

          <button
            onClick={() => selectedPlan && onSubmit({ planId: selectedPlan.id, tenure: selectedTenure, idv })}
            disabled={!canContinue}
            className={`px-4 py-2 rounded-lg text-white font-medium transition-colors
              ${canContinue
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-gray-300 cursor-not-allowed'}`}
          >
            Далее
          </button>
        </div>
      </div>

      {/* Модальное окно */}
      {modalPlan && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">{modalPlan.name}</h3>
              <button onClick={() => setModalPlan(null)} className="text-gray-500">✖️</button>
            </div>
            <p className="text-sm mb-2">{modalPlan.benefits.covered.map(b => b.title).join(', ')}.</p>
            <div>
              <h4 className="font-semibold">Что покрывается</h4>
              <ul className="list-disc pl-5 space-y-1">
                {modalPlan.benefits.covered.map((b, i) => (
                  <li key={i}>
                    <span className="font-medium">{b.title}:</span> {b.description}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold">Что не покрывается</h4>
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
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
