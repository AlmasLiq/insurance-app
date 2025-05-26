// src/pages/VehicleInsuranceForm.tsx
import { useEffect, useState } from 'react'
import type { InsuranceModel} from '../types'
import StepFive from '../componets/InsuranceFrom/StepFive/StepFive'
import StepFour from '../componets/InsuranceFrom/StepFour/StepFour'
import StepOne from '../componets/InsuranceFrom/StepOne/StepOne'
import StepThree from '../componets/InsuranceFrom/StepThree/StepThree'
import StepTwo from '../componets/InsuranceFrom/StepTwo/StepTwo'
import SidebarSteps from '../componets/SidebarSteps/SidebarSteps'

export default function VehicleInsuranceForm() {
  const steps = [
    'Детали транспорта',
    'Выбор плана',
    'Выбор дополнительных опций',
    'Личные данные',
    'Подтверждение',
  ]


  const [step, setStep] = useState(0)
  const [data, setData] = useState<InsuranceModel>({
    // Step 1
    makeModel:    '',
    regDate:      '',
    policyStatus: '',
    // Step 2
    planId:       '',
    tenure:       null,
    idv:          0,
    // Step 3
    addOns:       [],
    addOnsTotal:  null,
    // Step 4
    fullName:     '',
    email:        '',
    mobilePhone:  '',
    pincode:      '',
    iin: '',
    // Step 5 (можно будет перезаписать данными из API)
    insurer:      'V-Insurance',
    policyNumber: '3647Y459319P',
    issueDate:    '',
    startDate:    '',
    endDate:      '',
    status:       '',
    manufactureYear: '',
  })

  useEffect(() => {
    console.log(data)
  }, [data])

  const updateFields = (fields: Partial<InsuranceModel>) =>
    setData(d => ({ ...d, ...fields }))

  return (
    <div className="flex justify-center items-center">
  <div className="flex gap-12 px-6 py-10 justify-center items-start">
    <SidebarSteps
      steps={steps}
      currentStep={step}
      onStepChange={setStep}
    />

<div className="bg-white rounded-2xl shadow-lg p-6 w-[575px] flex flex-col">
        {step === 0 && (
          <StepOne
            makeModel={data.makeModel}
            regDate={data.regDate}
            policyStatus={data.policyStatus}
            onChange={updateFields}
            onNext={() => setStep(1)}
            manufactureYear={data.manufactureYear}
          />
        )}
        {step === 1 && (
          <StepTwo
            onBack={() => setStep(0)}
            onSubmit={fields => {
              updateFields(fields)
              setStep(2)
            }}
          />
        )}
        {step === 2 && (
          <StepThree
            selectedAddOns={data.addOns}
            onBack={() => setStep(1)}
            onSubmit={({ addOns, total }) => {
              updateFields({ addOns, addOnsTotal: total })
              setStep(3)
            }}
          />
        )}
        {step === 3 && (
          <StepFour
            fullName={data.fullName}
            email={data.email}
            mobilePhone={data.mobilePhone}
            pincode={data.pincode}
            iin={data.iin}
            onBack={() => setStep(2)}
            onSubmit={fields => {
              updateFields(fields)
              setStep(4)
            }}
          />
        )}
        {step === 4 && (
          <StepFive
              insurer={data.insurer}
              policyNumber={data.policyNumber}
              fullName={data.fullName}
              iin={data.iin}
              issueDate={data.issueDate}
              startDate={data.startDate}
              endDate={data.endDate}
              status={data.policyStatus}
              makeModel={data.makeModel}
              tenure={data.tenure} 
              manufactureYear={data.manufactureYear}          />
        )}
      </div>
    </div>
  </div>

  )
}
