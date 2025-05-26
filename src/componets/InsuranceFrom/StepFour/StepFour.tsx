// src/components/InsuranceForm/StepFour/StepFour.tsx
import { useState } from 'react'
import type { StepFourProps } from '../../../types'
import { useTranslation } from 'react-i18next'

const namePattern    = /^[A-Za-z\u0400-\u04FF\s]+$/
const emailPattern   = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const mobilePattern  = /^\+7\d{10}$/
const pincodePattern = /^\d{6}$/
const iinPattern     = /^\d{12}$/

export default function StepFour({
  fullName:    initFullName,
  email:       initEmail,
  mobilePhone: initMobile,
  pincode:     initPincode,
  iin:         initIin,
  onBack,
  onSubmit,
}: StepFourProps) {
  const { t } = useTranslation()
  const [fullName, setFullName] = useState(initFullName)
  const [email,    setEmail]    = useState(initEmail)
  const [mobile,   setMobile]   = useState(initMobile)
  const [pincode,  setPincode]  = useState(initPincode)
  const [iin,      setIin]      = useState(initIin)

  const [touched, setTouched] = useState({
    fullName: false,
    email:    false,
    mobile:   false,
    pincode:  false,
    iin:      false,
  })

  const errorFullName = touched.fullName && !namePattern.test(fullName)
  const errorEmail    = touched.email    && !emailPattern.test(email)
  const errorMobile   = touched.mobile   && !mobilePattern.test(mobile)
  const errorPincode  = touched.pincode  && !pincodePattern.test(pincode)
  const errorIin      = touched.iin      && !iinPattern.test(iin)

  const isValid =
    namePattern.test(fullName) &&
    emailPattern.test(email) &&
    mobilePattern.test(mobile) &&
    pincodePattern.test(pincode) &&
    iinPattern.test(iin)

  const handleNext = () => {
    if (!isValid) return
    onSubmit({
      fullName,
      email,
      mobilePhone: mobile,
      pincode,
      iin,
    })
  }

  const inputClass = (hasError: boolean) =>
    `mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 ` +
    (hasError ? 'border-red-500' : 'border-gray-300')

  return (
    <div className="p-6 w-full space-y-6">
      <h2 className="text-xl font-semibold">
        {t('stepFour.title')}
      </h2>

      {/* ФИО */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          {t('stepFour.fields.fullName')}
        </label>
        <input
          type="text"
          value={fullName}
          onChange={e => setFullName(e.target.value)}
          onBlur={() => setTouched(t => ({ ...t, fullName: true }))}
          className={inputClass(errorFullName)}
        />
        {errorFullName && (
          <p className="mt-1 text-red-500 text-xs">
            {t('stepFour.errors.fullName')}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          {t('stepFour.fields.email')}
        </label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          onBlur={() => setTouched(t => ({ ...t, email: true }))}
          className={inputClass(errorEmail)}
        />
        {errorEmail && (
          <p className="mt-1 text-red-500 text-xs">
            {t('stepFour.errors.email')}
          </p>
        )}
      </div>

      {/* Телефон */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          {t('stepFour.fields.mobile')}
        </label>
        <input
          type="tel"
          placeholder={t('stepFour.placeholders.mobile')}
          value={mobile}
          onChange={e => setMobile(e.target.value)}
          onBlur={() => setTouched(t => ({ ...t, mobile: true }))}
          className={inputClass(errorMobile)}
        />
        {errorMobile && (
          <p className="mt-1 text-red-500 text-xs">
            {t('stepFour.errors.mobile')}
          </p>
        )}
      </div>

      {/* ИИН */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          {t('stepFour.fields.iin')}
        </label>
        <input
          type="text"
          maxLength={12}
          value={iin}
          onChange={e => setIin(e.target.value)}
          onBlur={() => setTouched(t => ({ ...t, iin: true }))}
          className={inputClass(errorIin)}
        />
        {errorIin && (
          <p className="mt-1 text-red-500 text-xs">
            {t('stepFour.errors.iin')}
          </p>
        )}
      </div>

      {/* Пин-код */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          {t('stepFour.fields.pincode')}
        </label>
        <input
          type="text"
          maxLength={6}
          value={pincode}
          onChange={e => setPincode(e.target.value)}
          onBlur={() => setTouched(t => ({ ...t, pincode: true }))}
          className={inputClass(errorPincode)}
        />
        {errorPincode && (
          <p className="mt-1 text-red-500 text-xs">
            {t('stepFour.errors.pincode')}
          </p>
        )}
      </div>

      {/* Навигация */}
      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={onBack}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
        >
          {t('stepFour.buttons.back')}
        </button>
        <button
          type="button"
          onClick={handleNext}
          disabled={!isValid}
          className={`px-4 py-2 rounded-lg text-white font-medium transition-colors
            ${isValid ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-300 cursor-not-allowed'}`}
        >
          {t('stepFour.buttons.next')}
        </button>
      </div>
    </div>
  )
}
