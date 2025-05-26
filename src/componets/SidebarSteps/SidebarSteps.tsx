import { useTranslation } from 'react-i18next'
import type { SidebarStepsProps } from '../../types'

export default function SidebarSteps({
  steps,
  currentStep,
  onStepChange,
}: SidebarStepsProps) {
  const { t } = useTranslation()

  return (
    <nav aria-label="Form steps">
      <ul className="space-y-5 text-[17px] font-normal leading-6">
        {steps.map((key, idx) => (
          <li
            key={key}
            className={`
              cursor-pointer
              transition-colors
              ${idx === currentStep
                ? 'text-indigo-500 font-semibold'
                : 'text-gray-500'}
            `}
            onClick={() => onStepChange(idx)}
            aria-current={idx === currentStep ? 'step' : undefined}
          >
            {t(key)}
          </li>
        ))}
      </ul>
    </nav>
  )
}
